# NERF-TECH WEBSITE

## About:

This is an ongoing project to allow players to track tags, give out club information at FPU, and show off the club's activities.

## Background on this Website

The situation on why this website had to be made was frankly funny. At the time, around Fall of 2024, I was the Head Officer of the Media Committee for the Nerf-Tech Club at Florida Polytechnic University, and the club had a problem. No one knew how to run the website they were using for the last 4-ish years.

The website the club used previously was a clone of I believe RIT's HVZ website that was held together by the club with duct tape, prayers, and no working knowledge on how to properly maintain it. To my knowledge, it ran off of a AWS database, the person who cloned it didn't know how to deploy it properly, the team that inherited it barely understood it, and to host the frontend, someone from the club would have to sacrifice their desktop for the entirety of a 5 day event

As such, I made this website to fill that need. It has been operational for around 2 years now, with small updates being made to help maintain it and it's communication with the discord bot it gets its information from.

## Requirements for website to meet for an MVP

- List Player Data [√]
- Track Tags [√]
- Track Status Types (Moderator, Human, Zombie, Original Zombie (OZ)) [√]
- Show off club media, Links, etc [√]
- Display rules [√]
- Securely send data to the database [√]
- Create database queries to match game behaviors [√]
- Communicate with discord bot on the HVZ Poly discord server [√]

## Current Work-in-Progress Items:

- Creating Badge functionality [√]
- Creating an Infection Map + Functionality [X]
- Create Interactive Map for players to use [X]

## Tech Stack:

### Frontend:

The Frontend is a React / Vite TypeScript website, using mostly bootstrap CSS stylings.

### Backend:

The Backend is a Django python website, acting as a Backend API for the Frontend to obfuscate details on the Database.

### Database:

The Database is an SQLiteCloud3 database, with 3 Tables currently. It has a Player_Data table, a Player_Badge table, and a Badges Table.
