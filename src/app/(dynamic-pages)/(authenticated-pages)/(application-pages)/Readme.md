## Our thoughts on the layout components

Ideally we would like our Sidebar, Navbar and some other components to be independent slots which implement [Next.js 13 Parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) and to be able to use them in any page. However, we are not able to do that yet because of the following reasons:

- The parallel routing features is extremely bug prone and it is not ready for production yet. We have tried to implement it but we have found many bugs and we have decided to wait until it is stable.
- There are far too few examples of parallel routing and layout components in the wild. We have found only one example of parallel routing and layout components in the wild and it is not a good example.
- The github issues related to parallel routing and layout components are not very active and it doesn't look like a top priority for the Next.js team.

Once the above concerns are addressed, we will be able to implement the Sidebar and Navbar as standalone layout slots and which can be independent of the main routing.
