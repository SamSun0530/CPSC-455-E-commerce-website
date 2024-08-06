# Group 10 - DealZone
A marketplace website for users wanting to buy and sell items. It will allow users to search, filter, and sort for items to purchase, and sellers to create sales listings. Users may add to cart, purchase, or wishlist sales listings, while sellers can edit or delete listings. Sellers can also add tags to the listings and users can filter listings based on the tags.

[![deploy](https://github.com/ubc-cpsc455-2024S/project-10_tech_titans/actions/workflows/deploy.yml/badge.svg)](https://github.com/ubc-cpsc455-2024S/project-10_tech_titans/actions/workflows/deploy.yml)

## Task Requirements

### Minimal
- Allow users to create an account ✅
- Allow users to login with account to allow creating, or buying sales items. Otherwise, view only ✅
- View list of sales posts ✅
- Create, edit, delete sales posts ✅
- Purchase items (simulate payment, empty cart, mark item(s) as sold) ✅
 
### Standard
- Search for listing based on keyword matching of title/description ✅
- Sorting function in the search results (by price, by similarity, or by posted date) ✅
- Tagging mechanism for listings, and allow results to be filtered by said tags ✅
- Cart function ✅
- Wishlist function ✅
- Purchase history page to see past purchases ✅

### Stretch
- Session handling to maintain logged in state across browser refresh ✅
- Graphs/ visualizations of products sold, profits, etc. Seller performance insights. ❌
- Utilize ai-algorithm for product suggestion based on purchase or search history ❌

## Techs used from Units 1-5

### Unit 1, Front end web technologies:
We utilised HTML, CSS, and JavaScript as fundamental technologies that serve as the backbone of our application's front-end. HTML structures the content, CSS styles it, and JavaScript adds interactivity, collectively creating a responsive and user-friendly interface. Additionally, by integrating Material UI, we leverage a robust library of pre-designed components that enhance the aesthetic appeal and consistency of the app, streamlining the development process compared to custom-styling from scratch.

## Above and Beyond functionality

## Next Steps
- We can add email verification when a user registers their account or delete their account as an extra security feature.
- In the seller view, we could show some seller statistics based on how their listings are doing, what kind of listings perform best etc.
- We can use machine learning to show recommended posts to users, based on their searches, wishlist and purchase history.

## List of contributions

Shreya Gupta: I worked on the homepage display and layout of listings. I also worked on seller view, edit/delete posts and create new listings. I also added loading state to many components while posts are fetched and added snackbar on individual listing page to let user know if the item was added to cart (or wishlist) or if it was already there based on server response. 

## Team Members

- Andy Lee: 4th year BSc student, currently working as a backend developer, hoping to gain some frontend experience.
- Ivena Du: 4th year CS student, interested in web development and video games.
- Sam Sun: 4th year CS student, have few experience about web design
- Shreya Gupta: M.Eng. student in Computer Engineering, recently worked at Powerex as full stack developer.




#### Task Breakdown

- User login
    - Frontend design: form inputs, username, password. Stylize UI, form input validations. Display error if incorrect password, or redirect to homepage if login successful.
    - Database: create table to keep track of sessions (session id, user id, last_activity)
    - Backend: create login API endpoint for frontend to call on form submit, validate/sanitize inputs, salt + hash password, compare with record in DB. If successful, return session/auth token/cookie to be used in subsequent API calls.
    - Backend: create auth function for each API that returns guest page or logged in page depending on session validation

- Account registration
    - Frontend design: form inputs, username, password, email. Stylize UI, form input validations
    - Database: create table to keep track of users with appropriate fields (do not store password in plaintext, salt + hash)
    - Backend: create registration API endpoint for frontend to call on form submit, validate/sanitize inputs, create DB record.
 


## Images (Prototype Sketches for now)

<img src ="images/home_prototype.jpg" width="300px">

<img src ="images/register_prototype.jpg" width="300px">

<img src ="images/cartpage_prototype.jpg" width="300px">

## References

DZ Logo used from: https://www.freepik.com/premium-vector/logo-dz_42660603.htm 



