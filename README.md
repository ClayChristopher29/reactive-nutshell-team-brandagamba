To run the Reactive Nutshell Application:

Visit github and fork a repository from https://github.com/NewForce-at-Mountwest/reactive-nutshell-team-brandagamba.
In your fork, type npm install. After installation is complete, use the "npm install react-bootstrap" and the "npm install --save moment react-moment" commands to install the necesary node modules.

In the api folder, there will be two components: 'boilerplate.json' and 'database.json'. Copy the contents of the 'boilerplate.json' into the 'database.json' file and save. Open a new terminal window and run the 'json-server -p 5002 -w api/database.json' command to start your json server.

Run the 'npm start' command in your terminal to launch the website.

Once the Reactive Nutshell Application is loaded in your browser:

The application will load with a Sign In form, where the user can log in. There is a register button that navigates to a register page if the user does not already have an account. Use the credentials username: "Steve" email: "me@me.com" to log in and access pre-loaded sample data from your json server.

There is a nav bar at the top which allows the user to navigate to six sections.

#News

User can click the "Add new article" button to add a synopsis, title, and link for a new article. Articles will then be displayed in descending order (by date) in the article list. Upon clicking the "Edit" button, user will be taken to a pre-populated form where they may change the details of a previously entered article.

#Events

User can click the "Add event" button to access a form where they may enter a name, location, and date for an event. Adding the event will return them to their personal event list where the events will be sorted with the closest upcoming event at the top, in slightly larger font, with a light blue background. The edit event button will take them to a pre-populated edit form where they may change the details of the event. Saving the changes will return them to the newly sorted list. The "delete" button will allow a user to remove an event from the database as well as the list.

#Messages

User will navigate to a scrolling message list where they can see messages entered by other users, as well as their own. They may enter a new message in the message box below the scroll box. They may also use the "edit" feature to edit any message they have entered in place. Users cannot edit messages submitted by other users.

#Tasks

Upon navigating to the "tasks" section, users will be able to add a new task with the "Add new task button". They may enter a due date and a task name. Upon saving the task, they will be returned to their personal task list. Users can check the checkbox next to a task to remove it from their list, but keep it in the database. To edit a task, a user can click the task name to access a pre-populated edit form. After editing their changes, the user can submit them by pressing the "enter" key.

#Notes

In the Notes section, a user may choose to add a new note by clicking on the "New Note" button. They can save a note to their personal list, choose to edit a note with a pre-populated edit form, or delete a note from their list and the database entirely.

#Friends


#Log out
The user may log out at any time by clicking the "Log Out" link in the nav bar. Upon logging out, the user will be returned to the "Log In" page and will be unable to access their information until logged back in.

