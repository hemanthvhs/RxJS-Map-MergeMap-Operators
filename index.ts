import { of,from } from 'rxjs'; 
import { map,tap,mergeAll,mergeMap } from 'rxjs/operators';

const getnewdata = (param) => {
  return of(`The data returned ` + param)
}

const outer$ = from([1,2,3])

// CASE1 : WRONG WAY -- Check the console for understanding

outer$.pipe(
  map (num => getnewdata(num))
).subscribe( res =>  console.log(res))

// CORRECT WAY
// Subscription inside subscription - CALLBACK HELL
outer$.pipe(
  map (num => getnewdata(num))
).subscribe( res => {
  res.subscribe( val => console.log(val))
})

console.log("*************")
// using mergeAll and map 

outer$.pipe (
  map(num => getnewdata(num)),
  mergeAll()
).subscribe( val => console.log(val))


console.log("*************")
// using mergeMap

outer$.pipe(
  mergeMap( num => getnewdata(num))
).subscribe(val => console.log(val))


/*

The map operators
--------------------

The map operator is the most common of all. For each value that the Observable emits you can apply a function in which you can modify the data. The return value will, behind the scenes, be reemitted as an Observable again so you can keep using it in your stream.

           ** In Accordance to the Example **
Our map function returns the value of the getnewdata function. In this case that is an Observable. This does however create a problem because now we’re dealing with an additional Observable.

To further clarify this: we have from([1,2,3,4]) as our ‘outer’ Observable, and the result of the getData() as our ‘inner’ Observable.

In theory we have to subscribe to both our outer and inner Observable to get the data out.

If we wont do then check the CASE-1 

Inorder to get the data out, check  CASE-2 

As you can might imagine this is far from ideal as we have to call Subscribe two times also leads to CALLBACK HELL

Inorder to avoid the above conditions , we use mergeMap which is combination of mergeAll & map

*/

/*

mergeAll() operator
-------------------------

MergeAll takes care of subscribing to the ‘inner’ Observable so that we no longer have to Subscribe two times as mergeAll merges the value of the ‘inner’ Observable into the ‘outer’ Observable.

Check CASE-3

For reduction in code complexity we go for mergeMap()


*/


/*

mergeMap() operators
---------------------------

FlatMap is an alias of mergeMap and behaves in the same way.

*/