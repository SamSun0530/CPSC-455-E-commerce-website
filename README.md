# Group 10 - DealZone

- Your title can change over time.

## Describe your topic/interest in about 150-200 words

To be extended, a brief description for now.

An e-commerce/marketplace website for users wanting to buy and sell items. It will allow users to search, filter, and sort for items to purchase, and sellers to create sales listings. Users may add to cart, purchase, or wishlist sales listings, while sellers can edit listings, and view relevant statistics. Time permitting, we may add personal recommendations to users based on user history, email notifications, and additional seller statistics.

## Team Members

- Andy Lee: one sentence about you!
- Ivena Du: one sentence about you!
- Sam Sun: one sentence about you!
- Shreya Gupta: one sentence about you!

## Task Requirements

### Minimal

- Allow users to create an account
- Allow users to login with account to allow creating, or buying sales items. Otherwise, view only
- View list of sales posts (organized by posting date for example)
- Create, edit, delete sales posts.
- Purchase items (simulate payment, empty cart, mark item(s) as sold)

### Standard

- Search for listing based on keyword matching of title/description
- Sorting function in the search results (by price, by similarity, or by date)
- Tagging mechanism for listings, and allow results to be filtered by said tags
- Cart function(put products in a row and can buy them at once)
- Wishlist function
- Purchase history

### Stretch

- allow users to sign up for restock/discount email notifications for specific items.
- Graphs/ visualizations of products sold, profits, etc. Seller performance insights?
- Utilize ai-algorithm for product suggestion based on purchase or search history

#### Task Breakdown

Sam Sun:
- User login
    - Frontend design: form inputs, username, password. Stylize UI, form input validations. Display error if incorrect password, or redirect to homepage if login successful.
    - Database: create table to keep track of sessions (session id, user id, last_activity)
    - Backend: create login API endpoint for frontend to call on form submit, validate/sanitize inputs, salt + hash password, compare with record in DB. If successful, return session/auth token/cookie to be used in subsequent API calls.
    - Backend: create auth function for each API that returns guest page or logged in page depending on session validation

Andy Lee:
- Account registration
    - Frontend design: form inputs, username, password, email. Stylize UI, form input validations
    - Database: create table to keep track of users with appropriate fields (do not store password in plaintext, salt + hash)
    - Backend: create registration API endpoint for frontend to call on form submit, validate/sanitize inputs, create DB record.
 
Ivena Du:
- listing function(a button in the homepage linked to the sell page) (should block users who are not admin: by hiding the button?)
    - Posting function(A pop out window takes input: product name, price)
    - editing/deleting function(go to the items and click “edit” button then can change inputs mentioned above or delete that)
    - purchase function(click buy or add to cart and a checkout page)
    - Frontend Page design(create pages for the mentioned function)

Shreya Gupta:
- Cart and wishlist function
    - Be able to add items to cart and wishlist
    - Sum all the product price, pay at once and automatically change their status as sold
    - can remove items from cart and wishlist
    - can add wishlist item to cart



## Images (Prototype Sketches for now)

<img src ="images/home_prototype.jpg" width="300px">

<img src ="images/register_prototype.jpg" width="300px">

<img src ="images/cartpage_prototype.jpg" width="300px">

## References

{Add your stuff here}



