# Expenses

A front end aplication "Wallet" where the user can access and tracks his daily expenses. 

It connects to a backend service written in Python/Flask to collect data from a MongoDB. (https://github.com/sorasimuon/Service_Expenses)

Live Preview: https://expenses-cd8fe.firebaseapp.com/ 

Credential tests: 

username : "user1@email.com"

password: "test"

## Project status

Wallet is the first functionnality that is part of my bigger project "Happy Suite". New functionalities will developped later on for completing the suite.

Next steps:
  
  - The user wants to login and keeps a session opened (maybe using JWT)
  - The user wants to add several expenses or earnings at the same time (upload JSON, csv, Excel file)
  - The user wants a recap table for the earnings

## Stack
Javascript

Framework : Reactjs

Middleware : Redux

GUI library: Material UI, Chartjs

## Visuals

SignIn page: 

Credential tests: 

username : "user1@email.com"

password: "test"

![plot](./Capture-SignIn.PNG)



SignUp page:

![plot](./Capture-SignUp.PNG)



Wallet page:

![plot](./Capture-Wallet.PNG)



Data loaded from backend service Expenses (https://github.com/sorasimuon/Service_Expenses):

Chartjs library used for plotting data

![plot](./Capture-Wallet+Data.PNG)



New Expense modal:

![plot](./Capture-Wallet+NewExpense.PNG)



New Earnings modal:

![plot](./Capture-Wallet+NewEarnings.PNG)
