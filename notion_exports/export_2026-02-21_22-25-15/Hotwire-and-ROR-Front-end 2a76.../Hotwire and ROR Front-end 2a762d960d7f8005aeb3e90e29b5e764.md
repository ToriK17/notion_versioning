# Hotwire and ROR Front-end

### **Turbo Drive**

- **Enable/Disable:** Enabled by default; disable per link/form with `data-turbo="false"`.
- **Reload changed assets:** Turbo reloads `<head>` assets when they differ between requests; unchanged ones are preserved.
- **Loading bar:** Displays navigation progress; customizable via CSS or replaced with a custom progress indicator.

---

### **Turbo Frames**

- **Targeting:** Use `id` on `<turbo-frame>` and link with `data-turbo-frame="frame_id"`.
- **Why:** Updates part of a page without full reload.
- **Auto-loading:** Add `src="/path"` on the frame to fetch content automatically on page load.
- **Multiple frames:** Each frame updates independently; useful for modular UI sections.

---

### **Turbo Streams**

- **Add a row:**
    
    ```
    <turbo-stream action="append" target="table_body">
      <template><tr>...</tr></template>
    </turbo-stream>
    
    ```
    
- **Multiple updates:** Include multiple `<turbo-stream>` tags in one response.
- **Broadcasting:** Sends Turbo Stream updates via ActionCable. Built **on** WebSockets but uses Rails helpers (`broadcast_*`) for declarative real-time updates.

---

### **Stimulus**

- **Connection:** Controllers live in `/app/javascript/controllers`; connect with `data-controller="name"`. It combines targets with actions.
- **Purpose:** Add small, declarative JS behaviors to HTML, keeps JS modular and tied to DOM.
- **Targets:** Mark with `data-name-target="element"` for easy reference in controllers.
- **Actions:** Declare with `data-action="event->controller#method"` (e.g. `click->dropdown#toggle`).
- **Toggle CSS:**
    
    ```jsx
    this.element.classList.toggle("active")
    
    ```
    
- **Pass data (values):**
    
    ```html
    <div data-controller="example" data-example-name-value="Tori"></div>
    
    ```
    
    Access with `this.nameValue` in the controller.