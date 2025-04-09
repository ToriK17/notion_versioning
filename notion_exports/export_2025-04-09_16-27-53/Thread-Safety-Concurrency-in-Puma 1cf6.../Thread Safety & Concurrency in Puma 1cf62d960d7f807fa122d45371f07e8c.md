# Thread Safety & Concurrency in Puma

Puma is Rails’ default web server. It’s **multi-threaded**, which means it can handle multiple requests at the same time in different threads—**without forking new processes** like Unicorn or Passenger.