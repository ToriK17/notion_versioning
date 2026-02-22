# Design Patterns & Service Objects in Rails

### Rails Architecture

Things that are idiomatic but not ‘standard core’

- `app/services` – for business logic / orchestration. POROs here keep things modular and testable
- `app/forms` – for parameter and multi-model validation
- `app/interactors` – for use-case style flows
- `app/queries` – for extracting gnarly SQL from models
- `app/presenters` or `app/decorators` – for view logic (if you're classy)
- `app/policies` – Pundit authorization setup, a fairly idiomatic way in Rails to separate access control from business logic. It keeps our controllers clean.

## The Mental Model:

1. **Controllers should orchestrate.** (“This action happens → call this object.”)
2. **Models should model.** (Associations, validations, database stuff.)
3. **Services should act.** (Encapsulate workflows.)
4. **Commands do a thing.**
5. **Queries ask a thing.**
6. **Form objects validate a thing.**

### When to Break Things Out

- Break logic out of controllers when it involves more than basic CRUD. Try to avoid fat models/controllers, extract business logic into services.
    
    Your controller’s job: *receive input, return output, don’t do brain surgery…*
    
- Break logic out of models when it doesn’t **relate directly to that model’s core responsibility** (i.e. validations, associations, pundit scopes).
- Use service objects for multi-step processes, especially ones with external dependencies (emailing, third-party APIs, file uploads/ csv exports, etc.).
- Prioritize single responsibility and separation of concerns.

---

## 🧈 `app/services` & Plain Old Ruby Objects (POROs)

The "Plain Old" in PORO emphasizes that it's a standard Ruby class without the "magic" or extensive functionality that Rails' core components (like ActiveRecord models, ActionController, ActionMailer, etc.) inject through inheritance. Why? Separation of concerns and single responsibility, are the biggest reasons.

**POROs:** Are intended to encapsulate business logic that doesn't directly relate to database persistence, or to orchestrate interactions between multiple ActiveRecord models. This gives you an encapsulated workflow that allows for test isolation and predictable service boundaries.

**PORO examples:**

```ruby
# app/services/user_signup_service.rb
class UserSignupService
  def initialize(user_params)
    @user_params = user_params
  end

  def call
    user = User.new(@user_params)
    if user.save
      WelcomeMailer.send_email(user).deliver_later
    end
    user
  end
end
```

---

## 🎬 Interactors, Form Objects, Commands (AKA: Rails' Off-Broadway Orchestration)

These are like your cool sidekicks when a single service object doesn’t cut it.

**Use interactors or orchestrators when:**

- You’re coordinating multiple service objects or steps.
- You want clear rollback or failure flows (check out this [Interactor gem](https://github.com/collectiveidea/interactor) later).

```ruby
# app/interactors/user_signup.rb
class UserSignup
  include Interactor

  def call
    user = User.new(context.params)
    unless user.save
      context.fail!(error: user.errors.full_messages)
    end

    WelcomeMailer.send_email(user).deliver_later
    context.user = user
  end
end
```

### 📝 Form Objects ( `app/forms`)

- Combine validations across multiple models or for one-off forms.
- Use when your ActiveRecord model is being held hostage by weird UI requirements.

```ruby
class SignupForm
  include ActiveModel::Model
  attr_accessor :name, :email

  validates :name, :email, presence: true
end
```

### Command Objects

This is a type of PORO. Used in Domain Driven Design. They’re built around a single, focused action, like `CreateInvoice`, `SubmitOrder`, `PromoteUserToAdmin`, etc. Named as a **verbPhrase** 

It’s not technically unique from a service object, it’s more of a naming philosophy and usage pattern.

---

## 🐖 “Fat Model / Fat Controller” Anti-Pattern

- Try to follow SRP Single Responsibility Pattern.
- In legacy apps, a lot of logic is dumped in models, but it’s best to pull that out into concerns or services where it makes sense