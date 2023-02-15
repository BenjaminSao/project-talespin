# **WaitLess**

An application aimed to improve to the Efficiency and Flow of **Restaurants** through enabling **Table Ordering** with added features such as QR Code & NFC integration, Stripe Payment, and Email Receipt. Customers will be Waiting Less!

## **Members**

- **Benjamin Saobuppha** (1006157276)
- **Johnson Su** (1005870461)
- **Yeonoh Jung** ()

## **Description**

### **Problem**

Nowadays, the food industry has been thriving and many people tend to eat out at restaurants. For smaller and local businesses, this will result in more customers which meaning more management overall. For example, if a food waiter needs to take order from every customer individually one by one, this will result in lots of time being used. In addition, Waiters also need to memorize the food order of their customers which increases memory load. Finally, after the customers are finished with their food, they'll need to pay or make a split payment if they're in a group, costing lots of time. For busier restaurants, this means the loss of business.

### **Initiative**

Our initiative is to improve the flow of restaurants by limiting the time consuming, memory intensive tasks for waiters/waitresses and also to help restaurant serve more customers.

### **Solution**

Our solution is to create an application that allows customers to make food order to the waiter/waitress by scanning or tapping a QR Code or NFC tag on their table with their phone. Doing so, we'll take them to an online menu which they can order from. Once an order is created the waiter/waitress will receive the order through their POS (built by us) and an SMS (Twilio), which could be sent to the kitchen. This means that the waiter doesn't have to take and memorize order from the customers, resulting in less wait time between customer and ordering and food to table. Customer will also be able to split bills and make payments through their mobile devices, through our integration with Stripe API and they'll receive an email receipt through SendGrid.

#### **Extra Features**

- Customers can request help from the waiter with a press of a button on their mobile device, which will send a notification to the waiter's device
- Waiters can manage the order of the orders received through an interactive drag and drop UI
- Restaurant owners can customize the table layout of their restaurant and waiters can find where to deliver food to

## **Complexity**

Creating this application will require the use of external libraries which increases the complexity, the main one in particular is:

- ****Auth0**** - For proper authorization and permission control of customers, waiter/waitress, and restaurant owners (1)
- **Socket.IO** - For a direct communication channel between customers and waiter/waitress. When an order is made through the customer, and POS updates in real time. This will be used as a replacement for long polling (2)
- **Stripe** - To enable payment from customers (2)
- **SendGrid** - To send email receipt to the customers after they've made a payment (2)
- **Twilio** - To send SMS to waiters that an order has been placed by customers in order to alert them (2) 

### **Extra Complexity**

Some of the extra features requires extra library to complete:

- **React Flow** - Restaurant owners can customize the layout (nodes) of their restaurants and waiters can navigate which table they're serving (2)
-  **Push API** - When the POS side of the application is closed, they should still receive notification that an order has been made  through offline push notifications (3)
- **Three.js** - Custom animations for landing page and home page? (2)

## **Goals for Alpha/Beta/Final**

The main goals for the **Alpha** version of the application is to:

- A **Figma** and **LucidChart** of the application layout
- Build the customer dashboard, waiter dashboard, and the owner dashboard with **authentication** and **authorization**.
  - The owner's dashboard should be able to add, delete, and update food items, tables, and generate links that bring to the customer's dashboard for each table
  - The customer's dashboard will contain the menu items for which they can order from
  - The waiter's dashboard will be able to see items being ordered and their corresponding tables
- Accept **payments** from customers
- **Deploy** the application
- Should be in an **MVP** state

The main goals for the **Beta** version of the application is to:

- Send email **receipt** to customers and send **SMS** to waiters
- Make the waiter's dashboard able to see order being made **without** the application being open using the Push API
- Create a **landing** and **home page** for the application using inviting UI elements with Three.js
- Let restaurant owner create table layouts where waiters can **navigate** to where the table is from their dashboard using React Flow

The main goals for the **Final** version of the application is to:

- Port the app to be a **multi-tenant** application which supports multiple businesses
- **Polish** the existing features and make it **aesthetically pleasing**