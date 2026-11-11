Name: Helen
Student ID: 202384014063

# My Information System Capstone Project Idea
I plan to build a lightweight web-based task management system. Users can add to-do tasks, view the task list, mark tasks as completed and delete tasks.

## Technology I will use
- Backend: Python + Flask
- Frontend: HTML, CSS and JavaScript

## What makes this project different
Most ready-made task management software has many extra functions and is heavy.
My system only focuses on the core to-do tracking features. It is simple, lightweight and easy to run on a local computer.

## Current Prototype Status
I have completed the basic prototype code. The application can run locally.
Task data is stored in program memory. There is no user login system and no database at this stage. All data will disappear once the Flask server restarts.

## Week 3 Progress & Tasks
This week I will design and build the web application with Flask. My tasks are as follows:
1. Develop and improve webpage interface style with HTML and CSS in VS Code.
2. Complete Mermaid diagrams including use-case diagram and activity diagram.
3. Test all core functions manually: add tasks, mark tasks complete, delete tasks.
4. Complete and optimise this README.md document.
5. Organise project files and upload the whole project to GitHub after testing passes.

## Activity Flowchart
```mermaid
flowchart LR
    A[Start] --> B[Input task]
    B --> C{Confirm save?}
    C -->|Yes| D[Save task to list]
    C -->|No| E[Cancel]
    D --> F[Show task list]
## Activity Flowchart
