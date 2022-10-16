# react-suspend-in-parallel

Utility to run multiple Suspense requests in parallel.

```js
import suspendInParallel from "react-suspend-in-parallel";

function ComponentThatSuspends(props) {
  const [thingOne, thingTwo] = suspendInParallel(
    fetchThingOne(props.id),
    fetchThingTwo(props.id)
  );

  // Render...
}
```
