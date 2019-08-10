# rs-can

Authentication library

### How to use 

```typescript
import AccessControl from "rs-can";

// set up access contol list

const accessControl = new AccessControl();
// allow user can manage its own post
accessControl.allow(User, "manage", Post, (user: User, ad: Ad) => user.id === ad.userId);
// condition with extra params,
// allow user to apply for the ad if  
accessControl.allow(User, "apply", Ad,
  (user: User, ad: Ad, application: AdApplication) => {
    const isClient = user.role === ROLES.CLIENT;
    const notOwner = user.id !== ad.userId;
    const notApplied = !application;
    const adActive = ad.active;

    return isClient && notOwner && notApplied && adActive;
  }
);
accessControl.allow(UnauthenticatedUser, "viewAd");

const currentUser = new User({id: 123});
const post = new Post({user_id: 123});
accessControl.can(currentUser, "manage", post); // true

const ad = new Ad({active: true, user_id: 123});
const application = undefined;
const client = new User({id: 124, role: ROLES.CLIENT});
accessControl.can(currentUser, "apply", ad, application); // true  

```
