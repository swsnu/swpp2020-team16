# Coding MBTI
### Requirements and Specification Document
### 09/21/2020, version 1.0.
### 10/17/2020, version 1.1. Add user stories, Update UI Requirements, Add TOC

# Project Abstract

Coding MBTI is web service from which users can get a chance to inspect their code, get insight on their coding habit and level compared to others and construct their personalized strategy to empower coding skills. Coding MBTI gives users the exact coordinates of their coding habit among many other coders around the world and next coordinates to improve their code. To achieve that goal, our software will give 3 main experiences to our users. 

1. Coding MBTI test, which tells what kind of coding style each user has using ML techniques based on 4 core criteria we’ve made. 
2. Personalized Report, which gives thorough analysis based on result of MBTI test. 
3. Matching System, which recommends coders who has different style, similar style, or better quality using the information from each user’s Personalized Report. 

Coding MBTI collects and saves every small data which is made from user’s MBTI test or just problem solving. And It analyzes those data and visualizes them by providing Personalized Report to each user. Personalized Report includes better solution to each problem. Users will be able to check their coding levels or styles among other users from Personalized Report. Based on that, Coding MBTI could also help people who want to make a team, find a tutor, mentor, hire an employee, or find a friend. It would give them a recommendation that is suitable for their need.


# Customer

General users of Coding MBTI would be people who need tools to get insight including code writing style and habit compare to others or just for fun. And specific users of Coding MBTI would be people who want to make a team, find a tutor, mentor, hire an employee, or find a friend.

# Competitive Landscape 

Coding MBTI would look like problem solving websites that is already exists, in a way. But what is discriminated from them is as follows.

### More personalized
It collects and saves every small data. When user does Coding MBTI, it’s going to monitor user’s action. For instance, keyboard input counts, problem solving time, how complexity caring he is, coding style or habit. Some of them might need appropriate preprocessing procedure to have that meaning. It visualized those preprocessed and analyzed data in Personalized Report. Based on each user’s Personalized Report, it not only shows information about in which part they are weak to or good at, but also shows better personalized solution with enough explanation on how better it is, and why it is better. And it also recommends problem set that is appropriate to that user's level.

### Providing people matching
It recommends people out of user’s Personalized Report and their objective. For example, for user who want to find a mentor, our matching system will recommend people who is way better than that user in many MBTI aspects.  And if someone want to make a team for specific task, she might want to find someone who has similar code writing styles to her. It will be able to give perfect recommendation list of people based on user’s need and their MBTI result. 

### More interactive
It provides private message service, so that our users can easily get in touch with people with whom they want to be a friend, mentor, or team. It also provides public post service, so that our users share their answer, share their opinion, find people, or get some tips.  



# User Stories
&nbsp;

- [User/Coder section](#user-section)
  * [Feature: User can sign in](#feature--user-can-sign-in)
    + [Meta specs](#meta-specs)
    + [Scenario](#scenario)
    + [Acceptance test](#acceptance-test)
    + [Exception Test](#exception-test)
  * [Feature: User can sign up](#feature--user-can-sign-up)
    + [Meta specs](#meta-specs-1)
    + [Scenario](#scenario-1)
    + [Acceptance test](#acceptance-test-1)
    + [Exception](#exception)
  * [Feature: Coder can run their code in web](#feature--coder-can-run-their-code-in-web)
    + [Meta specs](#meta-specs-2)
    + [Scenario](#scenario-2)
    + [Acceptance test](#acceptance-test-2)
    + [Exception Test](#exception-test-1)
  * [Feature: Coders can see other users' solutions for the same problem](#feature--coders-can-see-other-users--solutions-for-the-same-problem)
    + [Meta specs](#meta-specs-3)
    + [Scenario](#scenario-3)
    + [Acceptance test](#acceptance-test-3)
    + [Exceptions](#exceptions)
  * [Feature: Coder can submit their code](#feature--coder-can-submit-their-code)
    + [Meta specs](#meta-specs-4)
    + [Scenario](#scenario-4)
    + [Acceptance test](#acceptance-test-4)
    + [Exception Test](#exception-test-2)
  * [Feature: Coder can check own coding style statistically](#feature--coder-can-check-own-coding-style-statistically)
    + [Meta specs](#meta-specs-5)
    + [Scenario](#scenario-5)
    + [Acceptance test](#acceptance-test-5)
    + [Exception Test](#exception-test-3)
  * [Feature: Coder can meet people with same coding style](#feature--coder-can-meet-people-with-same-coding-style)
    + [Meta specs](#meta-specs-6)
    + [Scenario](#scenario-6)
    + [Acceptance test](#acceptance-test-6)
    + [Exceptions](#exceptions-1)
  * [Feature: User can send message to other users](#feature--user-can-send-message-to-other-users)
    + [Meta specs](#meta-specs-7)
    + [Scenario](#scenario-7)
    + [Acceptance test](#acceptance-test-7)
    + [Exceptions](#exceptions-2)
  * [Feature: User can receive message from other users](#feature--user-can-receive-message-from-other-users)
    + [Meta specs](#meta-specs-8)
    + [Scenario](#scenario-8)
    + [Acceptance test](#acceptance-test-8)
    + [Exceptions](#exceptions-3)
- [Manager Section](#manager-section)
  * [Feature: User can get authenticated as Manager](#feature--user-can-get-authenticated-as-manager)
    + [Meta specs](#meta-specs-9)
    + [Scenario](#scenario-9)
    + [Acceptance test](#acceptance-test-9)
    + [Exceptions](#exceptions-4)
  * [Feature: Manager can create group](#feature--manager-can-create-group)
    + [Meta specs](#meta-specs-10)
    + [Scenario](#scenario-10)
    + [Acceptance test](#acceptance-test-10)
    + [Exception Test](#exception-test-4)
  * [Feature: Manager can invite coders to created group](#feature--manager-can-invite-coders-to-created-group)
    + [Meta specs](#meta-specs-11)
    + [Scenario](#scenario-11)
    + [Acceptance test](#acceptance-test-11)
    + [Exception Test](#exception-test-5)
  * [Feature: Manager can see the coding style of member coders in group](#feature--manager-can-see-the-coding-style-of-member-coders-in-group)
    + [Meta specs](#meta-specs-12)
    + [Scenario](#scenario-12)
    + [Acceptance test](#acceptance-test-12)
    + [Exception Test](#exception-test-6)
  * [Feature:  Manager can see possible relations between member coders in group.](#feature---manager-can-see-possible-relations-between-member-coders-in-group)
    + [Meta specs](#meta-specs-13)
    + [Scenario](#scenario-13)
    + [Acceptance test](#acceptance-test-13)
    + [Exception Test](#exception-test-7)
- [Researcher Section](#researcher-section)
  * [Feature: User can get authenticated as Researcher](#feature--user-can-get-authenticated-as-researcher)
    + [Meta specs](#meta-specs-14)
    + [Scenario](#scenario-14)
    + [Acceptance test](#acceptance-test-14)
    + [Exceptions](#exceptions-5)
  * [Feature: Researcher can get statistical information about general people's coding style](#feature--researcher-can-get-statistical-information-about-general-people-s-coding-style)
    + [Meta specs](#meta-specs-15)
    + [Scenario](#scenario-15)
    + [Acceptance test](#acceptance-test-15)
    + [Exceptions](#exceptions-6)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# User/Coder section

## Feature: User can sign in

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can sign in                                                                                                                                  |
| Actors                                   |User [ Coder/Researcher/Manager ]                                                                                                   |
| Precondition                         |User account is in database                                                                                                               |
| Trigger                                  |(1) User writes id/password in input form <br> (2) click `sign in` button.                                                      |

### Scenario

- **GIVEN** signed up User,
- **WHEN** the User fills up the id/password input 
  - **AND** the User clicks `sign in` button 
- **THEN** the User can be signed in


### Acceptance test

```
GIVEN the User account[For example, id:"id_in_database", password:"valid_password"],
WHEN the User filled up the id["id_in_database"]/password["valid_password"] input forms,
AND the User clicks `sign in` button,
THEN the User is signed in and redirected to wanted page.
```

    
### Exception Test
(1) User did not sign up
```
GIVEN the User account[For example, id:"id_not_in_database", password:"invalid_password"],
WHEN the User tries to sign in with id["id_not_in_database"]/password["invalid_password"],
AND the User  clicks `sign in` button,
THEN message showing 'no account' should be popped up and erase id and password in input form.
```
(2) User signed up, but wrong password
```
GIVEN the User account[For example, id:"id_in_database", password:"invalid_password"],
WHEN the User tries to sign in with id["id_in_database"]/password["invalid_password"],
AND the User  clicks `sign in` button,
THEN message showing 'wrong password' should be popped up and erase id and password in input form.
```
&nbsp;

## Feature: User can sign up

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can sign up                                                                                                                                  |
| Actors                                   |User [ Coder/Researcher/Manager ]                                                                                                   |
| Precondition                         |User account is not in database                                                                                                               |
| Trigger                                  |(1) User fills registration form <br> (2) click `sign up` button.                                                      |

### Scenario


- **GIVEN** not registered User,
- **WHEN** the User fills up the registration form
  - **AND** the User clicks `sign up` button 
- **THEN** the User can be signed up


### Acceptance test

```
GIVEN Registration form for each type of user
WHEN User filled up the registration form
AND User clicks `sign up` button,
THEN User is signed up with given information in registration form.
```

### Exception  
(1) Nickname already exists
```
GIVEN User account information[Email, Nickname, password, type]
WHEN Nickname is in account database
AND User clicks `sign up` button
THEN message showing 'Duplicated nickname' should be popped up and locate cursor to nickname input.
```
(2) Email already exists
```
GIVEN User account information[Email, Nickname, password, type]
WHEN Email is in account database
AND User clicks `sign up` button
THEN message showing 'Duplicated email' should be popped up and locate cursor to email input.
```

(3) Password check failed
```
GIVEN User account information[Email, Nickname, password, type]
WHEN password and password check is not equal
AND User clicks `sign up` button
THEN message showing 'Password check fail' should be popped up and locate cursor to password input.
```

(4) Invalid argument exception
```
GIVEN User account information[Email, Nickname, password, type]
WHEN email violates email specification or Nickname violates nickname specification or password violates password specification
AND User clicks `sign up` button
THEN message showing 'Invalid argument' should be popped up and show specification about each violation.
```

&nbsp;

## Feature: Coder can run their code in web

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Coder can run their code in web                                                                                                 |
| Actors                                   |Coder                                                                                                  |
| Precondition                         |Coder on `Home` page                                                                                                       
| Trigger                                  |Coder clicks `run` button
                                                

### Scenario


- **GIVEN** the Coder is on `Home` page 
- **WHEN** the Coder clicks `run` button 
- **THEN** the Coder gets result of their code 


### Acceptance test

```
GIVEN the Coder is on `Home` page
AND the Code has no error
WHEN the Coder clicks `run` button
THEN the Coder gets result of their code in web
```

    
### Exception Test
(1)the Coder writes Code having error
```
GIVEN the Coder is on `Home` page
AND the Code has error
WHEN the Coder clicks `run` button
THEN the Coder can check error of their code in web
```

## Feature: Coders can see other users' solutions for the same problem 

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Coders can see other users' solutions for the same problem                                                              |
| Actors                                   |Coder                                                                                                                                     |
| Preconditions                       |1. Coder should be logged in <br> 2. Coder should have solved the problem correctly
| Trigger                                  | Coder clicks on the `"see other solutions"` button                                                                               |

### Scenario


- **GIVEN** the coder signed in
  - **AND**  the coder have solved the problem correctly
- **WHEN** the coder clicks 'see other solutions' button
- **THEN** coder can see other solutions


### Acceptance test

```
GIVEN logged in coder 
AND the coder have solved the problem correctly
WHEN the coder clicks `"see other solutions"` button
THEN service response with other type of solutions
```

    
### Exceptions
(1) Coder is not logged in

```
GIVEN not logged in coder 
THEN the coder cannot click `"see other solutions"` button
```

(2) Coder is logged in, but the coder did not solve the problem
```
GIVEN logged in coder 
AND the coder have not solved the problem
WHEN the coder cannot click `"see other solutions"` button
THEN the coder gets an alert saying "you should solve the problem first
```

&nbsp;

## Feature: Coder can submit their code

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Coder can submit their code                                                                                                                                  |
| Actors                      |Coder                                                                                                   |
| Precondition                         |(1)Coder writes correct code <br> (2)Signed in Coder                                                                                                          |
| Trigger                                  |Coder clicks `submit` button                             |


### Scenario

- **GIVEN** the Coder writes correct code
  - **AND** the Coder signed in 
- **WHEN** the Coder clicks `submit` button 
- **THEN** the Coder can submit their code 

### Acceptance test

```
GIVEN the Coder writes correct code
AND the Coder signed in 
WHEN the Coder clicks `submit` button
THEN the Coder can submit their code
AND the Coder gets next problem
```

    
### Exception Test
(1) the Coder writes code having error
```
GIVEN code having error
WHEN the Coder clicks `submit` button
THEN the coder gets an alert saying "your code has error"
```
(2) the Coder is not signed in
```
GIVEN the Coder writes correct code
AND the Coder is not signed in 
WHEN the Coder clicks `submit` button
THEN the Coder should be redirected to `sign-in` page
```

## Feature: Coder can check own coding style statistically

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Coder can check own coding style statistically                                                                                 |
| Actors                                   |Coder                                                                                                                                                  |
| Precondition                         |(1) Coder signed in <br> (2) Coder has solved over threshold(maybe  5? 7?) number of problems  |
| Trigger                                  |Coder clicks `my page` button.                                                                                                            |

### Scenario

- **GIVEN** the Coder signed in
  - **AND** the Coder has solved over threshold(maybe  5? 7?) number of problems
- **WHEN** the Coder clicks `my page` button
- **THEN** the Coder can check own coding style statistically according to 4 index

* 4 index includes coding style, space complexity, time complexity, carefulness.


### Acceptance test

```
GIVEN the Coder is signed in
AND the Coder has solved over threshold number of problems
WHEN the Coder clicks `my page` button
THEN the Coder should see his code style statistics according to 4 index.
```

    
### Exception Test
(1) The Coder is not signed in
```
GIVEN the Coder is not signed in
WHEN the Coder tries to access `myStatistics page` with url,
THEN the Coder should be redirected to sign-in page.
```
(2) The Coder signed in, but did not solve over threshold number of problems
```
GIVEN the Coder signed in
AND the Coder has not solved over threshold number of problems
WHEN the Coder clicks `my page` button
THEN link 'You should solve more problems for accurate statistics' should be shown
```
&nbsp;

## Feature: Coder can meet people with same coding style

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Coder can meet people with same coding style      |
| Actors                                   | Coder                                                                                                               |
| Preconditions                       |1. Coder's coding style is on database. <br> 2. Coder is on `find teammates` page                           |
| Trigger                                  |Coder clicks `find my teammates' button.                                                                               |

### Scenario

- **GIVEN** Coder signed in
  - **AND** Coder is on `find teammates` page
- **WHEN** Coder clicks a `find my teammates' button
- **THEN** Coder can see list of coders with same coding style of him

### Acceptance test

```
GIVEN Coder of coding style INTJ signed in
AND Coder is on `find teammates` page
WHEN Coder clicks a `find my teammates' button
THEN Coder can see list of coders with style INTJ
```
    
### Exceptions
(1) Coder's style is not on database
```
GIVEN Coder without coding style is signed in
WHEN Coder access the `find teammates` page
THEN Coder should be request to solve problems and find own coding style first
```

&nbsp;

## Feature: User can send message to other users

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can send message toother users       |
| Actors                                   |User                                                                                                               |
| Preconditions                       |1. User should be signed in <br> 2. User is on `message` page                           |
| Trigger                                  |1. User should write message in input form <br> 2. User should choose other user to receive message <br> 3. User clicks on the `send message` button                                                                               |

### Scenario

- **GIVEN** the User signed in
  - **AND** the User is on `message` page
- **WHEN** the User should write message in input form
  - **AND** the User should choose other user to receive message(ex. other user be `Receiving User`)
  - **AND** the User clicks on the `send message` button 
- **THEN** the `Receiving User` receives message

### Acceptance test

```
GIVEN the User signed in
AND the User is on `message` page
WHEN the User writes message in input form
AND the User chooses other user to receive message(ex. other user be `Receiving User`)
AND the User clicks on the `send message` button 
THEN the `Receiving User` receives message
```

    
### Exceptions
(1) User did not sign in
```
GIVEN the User did not sign in
WHEN the User tries to access `message` page with url,
THEN the User should be redirected to sign-in page.
```

(2) User signed in, is on `message` page, but did not write any message or did not choose the receiver. 
```
GIVEN the User signed in
AND the User is on `message` page
WHEN the User did not write message in input form
AND the User did not choose other user to receive message(ex. other user be `Receiving User`)
THEN the `send message` button should  be disabled.
```

&nbsp;

## Feature: User can receive message from other users

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can receive message from other users       |
| Actors                                   |User                                                                                                               |
| Preconditions                       |1. User should be signed in <br> 2. User is on `message` page                           |
| Trigger                                  |User clicks message on message board                                                                               |

### Scenario

- **GIVEN** the User signed in
  - **AND** the User is on `message` page
- **WHEN** the User clicks a message on message board
- **THEN** the User can see message

### Acceptance test

```
GIVEN the User signed in
AND the User is on `message` page
WHEN the User clicks a message on message board
THEN the User can see message
```

    
### Exceptions
(1) User did not sign in
```
GIVEN the User did not sign in
WHEN the User tries to access `message` page with url,
THEN the User should be redirected to sign-in page.
```

&nbsp;

# Manager Section


## Feature: User can get authenticated as Manager

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can get authenticated as Manager                            |
| Actors                                   |User                                                                                                               |
| Preconditions                       | 1. User should be signed in <br> 2. User was not authenticated as Manager before                               |
| Trigger                                  | User clicks on the `"get authenticated as Manager` button                                                                               |

### Scenario

- **GIVEN** the User signed in
  - **AND** the User was not authenticated as Manager before
- **WHEN** the User clicks `get authenticated as Manager` button
- **THEN** the User goes to authentication page 
  - **AND** the User fills out form
  - **AND** the User gets authenticated as Manager


### Acceptance test

```
GIVEN  the User signed in
AND the User was not authenticated as Manager before
WHEN the User clicks `"get authenticated as Manager"` button
THEN the User goes to authentication page
THEN the User fills out form
THEN the User gets authenticated as Manager
THEN the User gets redirected to show statistical information page


```

    
### Exceptions
(1) User did not sign in
```
GIVEN the User did not sign in
WHEN the User tries to access `get authenticated as Manager` page with url,
THEN the User should be redirected to sign-in page.
```
(2) User signed in, but has already been authenticated as Manager
```
GIVEN the User[Manager] signed in 
AND the User[Manager] was authenticated as Manager already
WHEN the User[Manager] clicks `get authenticated as Manager`,
THEN the User[Manager] should be shown pop up message saying 'already authenticated as manager'
THEN the User[Manager] should be redirected to show statistical information page.
```

&nbsp;

## Feature: Manager can create group

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Manager can create group                                                                                                                 |
| Actors                                   |Manager                                                                                                                                              |
| Precondition                         |(1) Manager signed in <br>  (2) Manager is authenticated                                                                 |
| Trigger                                  |(1) Manager clicks `create group` button <br> (2) Manager writes unique group name <br>(unique in the Manager's created group names. No need for globally unique.) <br> (3) Manager can click `confirm` button                                                                         |

### Scenario

- **GIVEN** the Manager signed in
  - **AND** the Manager is authenticated
- **WHEN** the Manager  `create group` button
  - **AND** the Manager writes unique group name
  - **AND** the Manager clicks `confirm` button
- **THEN** the Manager can create group


### Acceptance test

```
GIVEN the Manager signed in
AND the Manager is authenticated
WHEN the Manager clicks `create group` button
AND the Manager writes unique group name
AND the Manager clicks `confirm` button
THEN the Manager can create group and redirected to 'Invite Coders To Group' page.
```

### Exception Test
(1) The Manager did not sign in
```
GIVEN the Manager did not sign in
WHEN the Manager tries to access `create group page` with url,
THEN the Manager should be redirected to sign-in page.
```

(2) The Manager signed in, but is not authenticated
```
GIVEN the Manager signed in
AND the Manager is not authenticated
WHEN the Manager tries to access `create group page` with url,
THEN the Manager should be redirected to sign-in page.
```

(3) The Manager signed in,is authenticated, clicked `group stats` button, but did not write unique group name
```
GIVEN the Manager signed in
AND the Manager is authenticated
WHEN the Manager clicks  `create group` button
AND the Manager writes non-unique group name
THEN `confirm` button is disabled with message `please write unique group name`
```

&nbsp;

## Feature: Manager can invite coders to created group

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Manager can invite coders to created group                                                                                     |
| Actors                                   |Manager                                                                                                                                              |
| Precondition                         |(1) Manager signed in <br> (2) Manager is authenticated <br> (3) Manager created at least one group(ex, `group G`) <br> (4) Manager is in `group G`'s 'Invite Coders To Group' page                                                |
| Trigger                                  |(1) Manager clicks `invite coders` button <br> (2) Manager writes the `Coder's name` <br> (3) Manager click `confirm` button                                                                         |

### Scenario

- **GIVEN** the Manager signed in
  - **AND** the Manager is authenticated
  - **AND** the Manager created at least one group(ex, `group G`)
  - **AND** the Manager is in `group G`'s 'Invite Coders To Group' page
- **WHEN** the Manager clicks `invite coders` button
  - **AND** the Manager writes the `Coder's name`( ex, `coder C`)
  - **AND** the Manager click `confirm` button
- **THEN** the Manager can invite the `Coder C` to a group
  - **AND** the Manager sends an invitation message to the `Coder C`


### Acceptance test

```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created at least one group(ex, `group G`)
AND the Manager is in `group G`'s 'Invite Coders To Group' page
WHEN the Manager clicks `invite coders` button
AND the Manager writes the `Coder's name`(ex, `Coder C`)
AND the Manager click `confirm` button
THEN the Manager can invite the `Coder C` to a group
THEN the Manager sends an invitation message to the `Coder C`
```

    
### Exception Test
(1) The Manager did not sign in
```
GIVEN the Manager did not sign in
WHEN the Manager tries to access `invite coders to group` page with url,
THEN the Manager should be redirected to sign-in page.
```

(2) The Manager signed in, but is not authenticated
```
GIVEN the Manager signed in
AND the Manager is not authenticated
WHEN the Manager tries to access `invite coders to group` page with url,
THEN the Manager should be redirected to authentication page.
```
(3) The Manager signed in, is authenticated, but did not create any group
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager did not create any group
WHEN the Manager tries to access `invite coders to group` page with url,
THEN the Manager should be redirected to create-group page.
```

(4) The Manager signed in,is authenticated, created a group(ex `group G`), but inviting Coder does not exist.
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created a group(ex `group G`)
AND the Manager is in `group G`'s 'Invite Coders To Group' page,
WHEN the Manager clicks `invite coders` button
AND the Manager writes the `Coder's name` who does not exist in database,
THEN the Manager can see message saying `the coder does not exist`.
```

&nbsp;

## Feature: Manager can see the coding style of member coders in group

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Manager can see the coding style of member coders in group                                                         |
| Actors                                   |Manager                                                                                                                                              |
| Precondition                         |(1) Manager signed in <br> (2) Manager is authenticated <br> (3) Manager has at least one group(ex, `group G`) <br> (4) the `group G` has member coders <br> (5) each coder of the `group G` solved over threshold(maybe 5? 7?) problems |
| Trigger                                  |Manager clicks `group stats` button                                                                                                |

### Scenario

- **GIVEN** the Manager  signed in
  - **AND** the Manager is authenticated
  - **AND** the Manager has at least one group(ex, `group G`)
  - **AND** the `group G` has member coders
  - **AND** each coder of the `group G` solved over threshold(maybe 5? 7?) problems
- **WHEN** the Manager clicks `group stats` button
- **THEN** the Manager can check member coders' coding style statistically


### Acceptance test

```
GIVEN the Manager  signed in
**AND** the Manager is authenticated
AND the Manager has at least one group(ex, `group G`)
AND the `group G` has member coders
AND each coder of the `group G` solved over threshold(maybe 5? 7?) problems
WHEN the Manager clicks `group stats` button
THEN the Manager can check member coders' coding style statistically
```

    
### Exception Test
(1) The Manager did not sign in
```
GIVEN the Manager did not sign in
WHEN the Manager tries to access `groupStatistics page` with url,
THEN the Manager should be redirected to sign-in page.
```
(2) The Manager signed in, but not authenticated
```
GIVEN the Manager signed in
AND the Manager is not authenticated
WHEN the Manager tries to access `groupStatistics page` with url,
THEN the Manager should be redirected to authentication page.
```

(3) The Manager signed in, is authenticated, but did not create any group
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager did not create any group
WHEN the Manager clicks `group stats` button
THEN the Manager is redirected to 'Create Group' page.
```
(4) The Manager signed in, is authenticated, created at least one group, but the group has no member except the manager himself,
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created a group(ex group G)
AND the group G has no other members except the manager himself
WHEN the Manager clicks `group stats` button
THEN the Manager is redirected to 'Invite Coders To Group' page.
```
(5) The Manager signed in, is authenticated, created at least one group, the group has other member coders, but each member coders did not solve over threshold(maybe 5? 7?) problems
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created a group(ex group G)
AND the group G has member coders
AND each member coders did not solve over threshold(maybe 5? 7?) problems
WHEN the Manager clicks `group stats` button
THEN the Manager is shown 'coders should solve over threshold number of problems' message
AND the Manager can see who did not solve over threshold number of problems
```
(6) The Manager has more than two groups,
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created a group(ex group G_1)
AND the Manager created a group(ex group G_2)
WHEN the Manager clicks `group stats` button
THEN the Manager is redirected to 'Group List' page
WHEN the Manager clicks `group G_1 stats` button
AND every preconditions are fulfilled,
THEN the Manager can check G_1's member coders' coding style statistically
```
&nbsp;

## Feature:  Manager can see possible relations between member coders in group.

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Manager can see possible relations between member coders in group                                                                                                                                 |
| Actors                                   |Manager                                                                                                   |
| Precondition                         |(1) Manager signed in  <br> (2) Manager is authenticated  <br> (3) Manager created at least one group(ex, `group G`) <br> (4) the `group G` has member coders <br> (5) each coder of the `group G` solved over threshold(maybe 5? 7?) problems      |
| Trigger                                  |(1) Manager clicks `coder relations` button(ex, `coder C`)                                                     |

### Scenario

- **GIVEN** the Manager signed in
  - **AND** the Manager is authenticated
  - **AND** the Manager created at least one group(ex, group G)
  - **AND** the group G has member coders
  - **AND** each coder of the `group G` solved over threshold(maybe 5? 7?) problems
- **WHEN** the Manager clicks `coder C relations` button
- **THEN** the Manager can see possible relations between member coders in group


### Acceptance test

```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created at least one group(ex, group G)
AND the group G has member coders
AND each coder of the `group G` solved over threshold(maybe 5? 7?) problems
WHEN the Manager clicks `coder C relations` button
THEN the Manager can see possible relations between member coders in group
```

    
### Exception Test
(1) The Manager did not sign in
```
GIVEN the Manager did not sign in 
WHEN the Manager tries to access `group` page with url
THEN the Manager should be redirected to sign-in page
```

(2) the Manager signed in, but is not authenticated
```
GIVEN the Manager signed in
AND the Manger is not authenticated
WHEN the Manager tries to access `group` page with url
THEN the Manager should be redirected to sign-in page
```

(3) the Manager signed in, is authenticated, but did not creat any group
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager did not create any group
WHEN the Manager clicks `coder C relations` button
THEN the Manager is redirected to 'Create Group' page
```

(4) The Manager signed in, is authenticated, created at least one group, but the group has no member except the manager himself
```
GIVEN the Manager signed in
AND the Manager is authenticated
AND the Manager created a group(ex group G)
AND the group G has no other members except the manager himself
THEN there is no `coder C relations` button
```

&nbsp;

# Researcher Section

## Feature: User can get authenticated as Researcher

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can get authenticated as Researcher                            |
| Actors                                   |User                                                                                                               |
| Preconditions                       | 1. User should be signed in <br> 2. User was not authenticated as Researcher before                               |
| Trigger                                  | User clicks on the `get authenticated as Researcher` button                                                                               |

### Scenario

- **GIVEN** the User signed in
  - **AND** the User was not authenticated as Researcher before
- **WHEN** the User clicks `get authenticated as Researcher` button
- **THEN** the User goes to authentication page 
  - **AND** the User fills out form
  - **AND** the User gets authenticated as Researcher


### Acceptance test

```
GIVEN the User signed in
AND the User was not authenticated as Researcher before
WHEN the the User clicks `"get authenticated as Researcher"` button
THEN the User goes to authentication page
THEN the User fills out form
THEN the User gets authenticated as Researcher
THEN the User gets redirected to show statistical information page
```

    
### Exceptions
(1) User did not sign in
```
GIVEN the User did not sign in
WHEN the User tries to access `get authenticated as Researcher` page with url,
THEN the User should be redirected to sign-in page.
```
(2) User signed in, but has already been authenticated
```
GIVEN the User[Researcher] signed in 
AND the User[Researcher] was authenticated as Researcher already
WHEN the User[Researcher] clicks `get authenticated as Researcher`
THEN the User[Researcher] should be shown pop-up message saying 'already authenticated as  Researcher'
THEN the User[Researcher] should be redirected to show statistical information page
```

&nbsp;

## Feature: Researcher can get statistical information about general people's coding style

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |Researcher can get statistical information about general people's coding style                             |
| Actors                                   |Researchers                                                                                                                                  |
| Preconditions                       |1. Researcher should be logged in <br> 2. Researcher should be authenticated                                   |
| Trigger                                  | Researcher clicks on the `'see statistical information'` button                                                                               |

### Scenario

- **GIVEN** the Researcher signed in
  - **AND** the Researcher was authenticated
- **WHEN** the Researcher clicks `show statistical information` button
- **THEN** the Researcher can see statistical information


### Acceptance test

```
GIVEN  logged in and authenticated Researcher
WHEN the researcher clicks `"see statistical information"` button
THEN service response with a lot of statistical information
```

    
### Exceptions
(1) Researcher is not logged in
```
GIVEN the Researcher did not sign in
WHEN the Researcher tries to access `show statistical information` page with url,
THEN the Researcher should be redirected to sign-in page.
```
(2) Researcher is logged in, but did not authenticated
```
GIVEN the Researcher signed in
AND the Researcher did not authenticated
WHEN the Researcher tries to access `show statistical information` page with url,
THEN the Researcher should be redirected to authentication page.
```

&nbsp;

# User Interface Requirements

![UI_requirements](./UI%20Requirements.png)

