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

### Day 3 (2025-04-24) log : 

After a while of not working on the game, I decided to return to it.

- I first made it possible to go between scenes and keep the account information of the checking account, as the game needs to go between scenes.

- With this added, I then proceeded to create a StockMarket scene and debug some problems with scene transitions.

- In order to have Stock-market-like accounts, I created StockAccount, which is a subclass of OperationableAccount and allowing some more real-market flow to an account. The luck factor can be increased or decreased to better or diminish luck.

- I created the stock market accounts in the StockMarketScene and also added buttons to go between the scenes.

- With some help from someone, I created Jerry to tell us what is going on in the market. Jerry is not the brightest bunch right now, but he's useful at least.

- Made Jerry influence the markets

My gif software doesnt seem to work right now. I cant show video, but maybe the web page will be able to show the progress.

### Day 4 (2025-04-25) log :

Today I'm going to publish the game probably.

- I added a system of shopping so that there is a purpose to playing the game

- I fixed many small bugs while testing out

- I added a way for it to calculate amount owed for a time spent in another scene so that money accumulates in a good way

- I added many assets so that the game feels more alive

- I fixed Jerry

- I added music to the game

- I added an attributions/credits page to the game to credit stuff that I used for the game

- I fixed other bugs that happened because of the new shopping system

- I hopefully published the game

### Post-Publish : 

The game has been successfully published on itch.io and submitted to the jam!

Link to itch.io : https://demomaker.itch.io/money-monk-with-jerry

Link to submissions page to see other projects : https://itch.io/jam/gamedevjs-2025/entries 

I suggest you checkout this game specifically (by jeydevlab) : https://jeydevlab.itch.io/stacknroll

