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
- Utilize API for address validation ✅ 
- Graphs/ visualizations of products sold, profits, etc. Seller performance insights. ❌

## Techs used from Units 1-5

### Unit 1, Front end web technologies:
We utilised HTML, CSS, and JavaScript as fundamental technologies that serve as the backbone of our application's front-end. HTML structures the content, CSS styles it, and JavaScript adds interactivity, collectively creating a responsive and user-friendly interface. Additionally, by integrating Material UI, we leverage a robust library of pre-designed components that enhance the aesthetic appeal and consistency of the app, streamlining the development process compared to custom-styling from scratch.

### Unit 2, React:
React is used for its hooks and for creating reusable components to be used in many pages on the website, which include the navbar, search bar, and pages for the listings; without React, the code would contain more redundant parts. Redux is used for centralized state management- the global state of our app, from listings to users, is all stored within our store- as well as its hooks (useDispatch, useSelector) that simplify the code. Finally, the Redux-toolkit is used make a lot of setup easier, from asynchronous functions via createAsyncThunk, to creating reducers and store configuration.

### Unit 3， Node.js:
Node.js is used to set up our server and handle routing functions, serving frontend requests. It interacts with our MongoDB database to perform CRUD operations including get, update, and delete that allows users to manipulate server side data at frontend.

### Unit 4， MongoDB:
We connect to and utilize MongoDB from the backend to store our site data such as user account information, listing details, cart content for each user, etc. Without a database, data would be lost and everything would start from scratch in the event of a server restart/crash. The database also allows for efficient management of large amounts of data, such as filter and sort queries.

### Unit 5， Release Engineering:
Github Actions is used to handle Continuous Delivery of changes to the cloud hosting service, Render. Once a pull request to the main branch is approved and merged, changes are automatically made live without any human intervention. 

## Above and Beyond functionality

## Next Steps
- We can add email verification when a user registers their account or delete their account as an extra security feature.
- In the seller view, we could show some seller statistics based on how their listings are doing, what kind of listings perform best etc.
- We can use machine learning to show recommended posts to users, based on their searches, wishlist and purchase history.

## List of contributions

Shreya Gupta: I worked on the homepage display and layout of listings. I also worked on seller view, edit/delete posts and create new listings. I also added loading state to many components while posts are fetched and added snackbar on individual listing page to let user know if the item was added to cart (or wishlist) or if it was already there based on server response. 

Ivena Du: Contributed to the registration page styling, wishlist styling and functionality, and the individual listing page display. Implemented search bar functionalities and initially deployed site on Render.

Sam Sun: Worked on the cart page, made the functionality of cart operation and its style. Function of fetching purchase history page data with display on frontend. Also the display of user account page.

## Team Members

- Andy Lee: 4th year BSc student, currently working as a backend developer, hoping to gain some frontend experience.
- Ivena Du: 4th year CS student, interested in web development and video games.
- Sam Sun: 4th year CS student, have few experience about web design
- Shreya Gupta: M.Eng. student in Computer Engineering, recently worked at Powerex as full stack developer.



## References

DZ Logo used from: https://www.freepik.com/premium-vector/logo-dz_42660603.htm 



