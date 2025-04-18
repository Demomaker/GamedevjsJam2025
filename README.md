# My Game code for : Gamedev.js Jam 2025 (April 13th to 26th 2025)

Theme : Balance

## Progress :

### Day 1 (2025-04-18) Log :

I basically set up the environment for creating the game.
I've never done serious HTML5 game development before, so I had to get used to how this all works.
I decided to use the Phaser API, since my game doesnt really need any fancy physics for the moment really and the Phaser API already permits a lot.


For the game itself, here's what I've done (or tried) so far :

- I setup the page around the project so that it looks nice and the overall visuals are ok for now.

- The game now has a main menu and a game scene. The main menu is very basic for now and the game scene doesn't have much visually yet.

- I have a system of accounts working good. I just need a way to add some buttons to that, but for now, just incrementing the values suffice to test out ideas.

- So far I have a Checking Account and a High-Yields Savings Account type of deal going on.

- I still need to figure out how to color the rectangle strokes to make some kind of border effect around the account texts.

(gif image captured using Peek on Kubuntu, which doesnt have the best results, but does give a general idea : )
![Image](https://github.com/user-attachments/assets/acaf9d2f-f846-429f-8bae-faee9e499cbf)

### Day 2 (2025-04-19) Log :

Events happened in real life, but I still worked on the game. It looks and feels much better right now with the smoother colors and design.

What I've done since last time :

- I first added a system of withdrawing and depositing amounts in accounts, which required the creation of ButtonComponent and other related classes.

- With some help (and some debugging to remove bugs after this), I implemented a custom game prompt for entering an amount for the depositing/withdrawing and also for general alerting events for the accounts.

- I created seperate types of accounts. There are now normal accounts and operational accounts. Operational accounts can have deposits and withdrawals.

- I added a way for accounts to depend on each other, for example, the High-Yields Savings Account now depends on the Checking Account, because if the Checking Account is empty, no money can be deposited in the High-Yields Savings Account.

- I added a temporary Work button to test out and see what incrementing via work does. Might develop this idea more.

- I made it possible to go back to the main menu from the game scene. Simply pressing escape will do that. (I had to create a KeyEventSubscription type of system for this, but it seems to work)

- I fixed some problems with colors in the game, as they weren't being converted correctly or used correctly in many different parts of the project.

- I'm planning on having some sort of way to pick stocks in a seperate scene. I might add some fun news event type-thing to influence our decisions.

- I'm also planning on adding some kind of actual work, although I dont know what that will look like.

![Image](https://github.com/user-attachments/assets/0aa8868a-79a1-4b40-8819-1dd87ee804f1)

