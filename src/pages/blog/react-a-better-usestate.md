---
layout: '../../layouts/BlogPost.astro'
title: 'React: a better useState'
description: 'Instead of mounting multiple useState inside a component, have a (second?) look at useReducer'
pubDate: 'May 9 2023'
heroImage: '/assets/blog/happygirl.webp'
---

I am sure you recognize yourself using multiple usestate hooks that share some kind of relation between them. And then you add a couple of useEffect to keep the relations between those states. Now what if you could do all that with just one hook? You can.

```typescript
export const MyComponent = () => {
    const [event, updateEvent] = useReducer((prev, next) => {
        const newEvent = {...prev, ...next}

        /* Add your centralized logic and guard rails here */
        if(newEvent.startDate > newEvent.endDate){
            newEvent.endDate = newEvent.startDate
        }

        // ...

        return newEvent
    }, {title: '', description:'', attendees:[]})

    return (
        <h2>Update Event</h2>
        <DateComponent onClick={e => updateEvent({startDate: e.target.startdate.value, endDate: e.target.enddate.value})} />
    )
}
```

Now you have a place for your logic centralized where you can ensure that your data is valid.
