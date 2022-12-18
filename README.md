                       Presentation of the G-Furn page

    Protected and public pages included.
        To install all the packages needed, write in the console "npm i".
        The project is availvable by hosting of firebase: 
        For authentication, database and storage, is used Firebase.

    Authentication:
	    => Sign up with profile picture
    		=> Error handling when fields are empty with error display below the field
    	=> Sign in
    		=> Error handling when fields are empty with error display below the field	
    	=> Sign out

    Collection/Posts:
    	=> Create new post with picture
    		=> Error handling when fields are empty with error display below the field	
    	=> Edit post (only if you are the owner)
    		=> Edit confirmation message displayed
    		=> Error handling when fields are empty with error display below the field	
    	=> Delete posts (only if you are the owner)
    		=> Delete confirmation message displayed
    	=> See collection(main page)
    		=> Search for posts by title (the X button clear all filters)
    		=> Filter posts by category
    	=> See post details
    		=> Edit and delete displayed only if you’re owner
    		=> Go to post owner’s profile to see more information and his/her posts (only authenticated users)

    	=> Search posts
    		=> Not able to submit if there aren’t results
    	=> Sort by name or date (searched included)
    	=> Filter by category
    		=> Message displayed when the aren’t results

    	For owners: 
    		=> Edit post (owner)
    			=> Alert for confirmation to edit the post
    		=> Delete post (owner)
	    		=> Alert for confirmation to delete the post

    Profile: 
    	=> Go to anyone’s profile
    	=> See the posts of the profile’s owner

	
    	For owners:
    		=> Edit profile
	    		=> Alert for confirmation to edit the post
	    		=> Error handling when fields are empty



# GFurn

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
