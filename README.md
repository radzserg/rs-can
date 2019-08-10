# rs-can

`rs-can` is an authentication library. It allows to build access control list. And then test access control. 

### How to use 

```typescript
import AccessControl from "rs-can";

// set up access control list

const accessControl = new AccessControl();
// allow user can manage its own post
accessControl.allow(User, "manage", Post, (user: User, post: Post) => user.id === post.userId);
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

// check access 

const currentUser = new User({id: 123});
const post = new Post({user_id: 123});
accessControl.can(currentUser, "manage", post); // true

const ad = new Ad({active: true, user_id: 123});
const application = undefined;
const client = new User({id: 124, role: ROLES.CLIENT});
accessControl.can(currentUser, "apply", ad, application); // true  

```

### API
`ActionControl` has 
- allow
- can

**access.allow** 
Set up access control. Everything which is not allowed is denied. `allow` method allows a perform to perform action 
on a target.

```

accessControl.allow(
    performer: Type<any>,
    action: string,
    target?: Type<any>,
    condition?: CheckCondition
): void;

export interface Type<T> extends Function {
    new (...args: any[]): T;
}

export type CheckCondition = (
    performer: any,
    target: any,
    options?: any
) => boolean;
```

- `performer` - required, class name(User, Admin, etc). If you want to test access for a guest user 
that couldn't be initiated with `User` object - add new dummy class GuestUser and pass it as a performer argument.
- `action` - required, string action name(update, manage, create)
- `target` - optional, target class name. Can user update {target}? (Post, Settings, etc)
- `condition?` - optional condition function. If it's provided condition will be invoked with 
performer object, target object and optional options.   

**access.can**
Checks the control
```
accessControl.can(
    performer: any,
    action: string,
    target?: any,
    options?: any
) => boolean;
```
 
 - `performer` - required. The performer object - `new User`, `new Admin`. Usually it's currently logged in user.
- `action` - required, action name(update, manage, create)
- `target` - optional. Object of the taget class - `new Post`, `new Settings`. Can be omitted when 
accessContol.allow(User, "createPosts")
- `options` - optional options. For example, you want to check if user can apply for the ad and you can pass extra object
adApplication as additional data.   
