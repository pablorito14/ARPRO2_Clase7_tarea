import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { OtherComp } from "./OtherCom";



const Main = () => {
  
  // const [state,setState] = useState({
  //   items: [1,2,3,4,5,6,7,8,9,10],
  //   hasMore: true
  // })
  const [state,setState] = useState([1,2,3,4,5,6,7,8,9,10])
  
  // const fetchMoreData = () => {
  //   console.log(fetchMoreData)
  //   if(state.items.length >=50){
  //     setState({hasMore: false});
  //     return;
  //   }

  //   setTimeout(() => {
  //     setState({items: state.items.concat([1,2,3,4,5,6])})
  //   }, 500);
  // }

  // console.log(state.items.length)
  return(
    <div>

      <InfiniteScroll
        dataLength={state.length}
        next={() => setState(state.concat([1,2,3,4,5,6]))}
        hasMore={true}
        loader={<p>Cargando</p>}

        >
        {
          state.map((item,i) => (
            <OtherComp i={i} />
          ))
        }

      </InfiniteScroll>
    </div>
  )
}

export { Main }