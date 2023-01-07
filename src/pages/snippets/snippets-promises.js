/**
 * Delay
 */
 function delay(timeout) {
    return new Promise( 
        (resolve) => {
             const timeoutHandle = 
                 setTimeout(() => {
                     clearTimeout(timeoutHandle);
                     resolve()                
                  }, timeout);
    });
 }
 // Example
 async function example(){
    console.log('The first log');
    await delay(1000);
    console.log('The second log with 1000 ms delay')
 }

 /**
  * Break Up a Long-Running Task
  */
  function nextFrame() {
    const nextTick = requestAnimationFrame || setImmediate. 
    return new Promise((res) => nextTick(() => res()))
}
// Example usage
async function longRunningTask(){
    let step = 0;
    while(true){
         if (++step % 5 === 0){
              await nextFrame();
         }
    }
 }
 longRunningTask();
 console.log('The first log')

 /**
  * Add a Timeout Limit To Promise
  */
  function addTimeoutToPromise(targetPromise, timeout) {
    let timeoutHandle;
    const timeoutLimitPromise = new Promise((res, rej) => {
        timeoutHandle = setTimeout(
            () => rej(new Error('Timeout exceeded')),
            timeout
        );
    });
    return Promise.race([targetPromise, timeoutLimitPromise])
        .then((res) => {
            clearTimeout(timeoutHandle);
            return res;
        });
 }
 //Example: no timeout
 addTimeoutToPromise(
    delay(1000).then(() => console.log('Completed')), 2000
);
// --> Completed
// Example: timeout
addTimeoutToPromise(
    delay(2000), 1000
).catch((e) => console.error(e.message))
// --> Timeout exceeded

/**
 * Complete promises in sequence
 */
 function completeInSequence(promiseFactories: () => Promise<any>) {
    return promiseFactories.reduce(
       (chain, promiseFactory) => chain.then(()=> promiseFactory()),
       Promise.resolve()
    );
 }
 // Example usage
 completeInSequence([
    () => delay(1000).then(() => console.log('1')),
    () => delay(1000).then(() => console.log('2')),
    () => delay(1000).then(() => console.log('3'))
 ])

 /**
  * Complete Only N Promises Simultaneously
  */

function completePromisesInPool(
    promiseFactories: () => Promise<any>,
    maxPoolSize: number
) {
   return new Promise((res) => {
      let nextPromise = 0;
      const runPromise = () => {
         nextPromise++;
         if (nextPromise > promiseFactories.length) {
            res();
            return;
         }
         return promiseFactories[nextPromise-1]()
              .then(() => runPromise())
      }
      
      Array.from({length: maxPoolSize})
           .map(() => runPromise());
     })
}
// Example usage
completePromisesInPool([
    () => delay(1000).then(() => console.log('1')),
    () => delay(1000).then(() => console.log('2')),
    () => delay(1000).then(() => console.log('3')),
    () => delay(1000).then(() => console.log('4')),
    () => delay(1000).then(() => console.log('5')),
    () => delay(1000).then(() => console.log('6'))
   ], 2)