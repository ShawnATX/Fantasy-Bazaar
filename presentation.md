Intro - 

This is Fantasy Bazaar. Our previous endeavours were designed to help save the world, this time we are building something with less gravitas. Fantasy Bazaar is a tabletop game companion app that is built for players and game masters of many different systems. The app is designed to help facilitate and manage player inventory and store interactions, allowing players to view available items for purchase and sell inventory to shops for game currency.

The target audience for this application will immediately understand the utility of such a tool. It is increasingly difficult to gather a group of friends to the same space at the same time, even for a short while. As such, 'game time' is quite precious and should be optimized. This tools primary goal is to allow users to focus on adventuring when they have game time, and leave the other stuff (shopping, inventory management) for outside of game time.

Market reasearch was very interesting to me. There are literally hundreds of apps, websites, and services for use as auxilary tools to games like Dungeons and Dragons and Pathfinder. However I was not able to find a single tool which was designed to meet this need.

Demonstration: 

...
This is the first version of the application, which has been seeded to by used for a Dungeons and Dragons 5e game. The design of this application has purposfully been abstracted away from a game system-specific layout, which will allow for several 'default' starting systems for new Bazaars, as well as a fully custom setup if it is desired.

Hurdles: 

There were a number of react-specific packages that we attempted to integrate without success, these proved to conflict with other application tools due to dependency version mismatching. The generalization of the intended underlying data models lead to a complex database structure which required significant planning and development effort, but ultimately was quite successful. 

Future Development:
Immediate future development efforts are oriented towards two feature trees: Game Master tools and overall design. 

Game Master Tools: Build out a 'new bazaar' tool which allows game masters to create a new bazaar instance, including customization of game system, settings, available items, and available inventory. After polling for user feedback on desired features for Game Masters I have come to realize that the application can be a tool that extends beyond out-of-game utility. Several game masters have expressed the desire for an app to use as a world-building tool, as well as a reference tool for in-game interactions. Such needs will need several new layers of features, including having many difference stores, each with their own settings and inventory. 

It has also been expressed for the desire of greater controll over player actions - including authorization on gold changes, haggling on purchases and sale prices, 


Design: The current design is built out to resemble command prompt user interfaces and games. The next phase of design effort will be oriented towards giving the entire app an 8-bit game feel (think shopping in the original Pokemon games). This will require generating a number of graphical background and image elements, which will likely require outside resources.
It is also important to update the design to deliver an enhanced UI to the user, where they can access any important tool or page directly from where they are now.


Additional systems: Set up seed data for basic items for a number of other game systems: Pathfinder, Starfinder, etc.