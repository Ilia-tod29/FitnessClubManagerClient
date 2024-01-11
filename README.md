# Fitness Club Manager Client

This project is the front-end of the Fitness Club Manager project. For storing the information in a reliable place it makes calls to [back-end API FitnessClubManagerAPI](https://github.com/Ilia-tod29/FitnessClubManagerAPI/tree/main) 
The project itself was created using [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.


## How to run

- Make sure you have the back-end up and running. If you don't know how to run it, follow the [instructions](https://github.com/Ilia-tod29/FitnessClubManagerAPI/blob/main/README.md)
- Run 'npm install', while located at the root of this project.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## How to use

- Navigation bar - contains the logo of the project and all the possible navigation.
- Sign in/Sign up page - accessible to all unauthorized users. Once the user authorizes themselves, they cannot access this pace until they sign out.
  this page contains both sign in and sign up forms and the user can easily switch between them by the link at the bottom-left part of the form.
- Home page - contains description for the gym.
- Gallery page - contains images of the fitness halls. 
  This page has different UI/UX for user with role "user" and role "admin".
  The admin can add and delete images.
- Inventory page - contains images of the inventory items in the gym with their names.
  This page has different UI/UX for user with role "user" and role "admin".
  The admin can add and delete images of the inventory.
- Subscriptions page - contains a list of subscriptions in the database.
  This page has different UI/UX for user with role "user" and role "admin".
  The user can see only their subscriptions and pay for a new subscription (for payment system - [stripe](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjNxeHCwdWDAxXsSPEDHfN3A9YQFnoECAwQAQ&url=https%3A%2F%2Fstripe.com%2Fen-bg&usg=AOvVaw1BtVMa-Oa-4zn4oH2vfxau&opi=89978449) is used).
  The admin can see all subscriptions(for all users), but can't create such. He also can delete existing subscriptions.
- Users page - contains list of all registered users. Only users with role "admin" access this page. They can suspend and delete users from this page.
- If a user tries to access any page that they don't have permissions for, they will be redirected to the Home page.
- Dark mode - by clicking the radio button at the most right part of the navigation bar, a user can toggle between light and dark theme. Applies for all pages.
