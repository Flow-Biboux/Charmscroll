///import logo from './logo.svg';
import './App.css';
import { useInfiniteQuery } from 'react-query';
import PostCard from './components/PostCard';
import InfiniteScroll from 'react-infinite-scroller'


function App() {

  /// Gather info from blockchain and store into Json
  const fetchPost = async ({pageParam =1}) =>{
    const response = await fetch(
      ///ask blockchain
      askBlock ()
    );
    const results = await response.json();
    return {results, nextPage: pageParam+1, totalPages:100}
  }

/// Infinite query
const {data, isLoading, isError, hasNextPage, fetchNextPage
}= useInfiniteQuery('posts', fetchPost, {
  getNextPageParam:(lastPage,pages)=>{
  if (lastPage.nextPage<lastPage.totalPages) return(lastPage.nextPage);
  return undefined;
},});



  return (
    <div className="App">
      <main>
        {isLoading?(
          <p>Loading...</p>
        ): isError?(
          <p>There was an error, please refresh the page</p>
        ):(
          /// Infinite scroll from react
<InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
  {data.pages.map((page)=>
  page.results.map((post)=><PostCard key={post.id} post={post}/>)
  )   }
</InfiniteScroll>)
              
        } </main>
      <header className="CHARM">{
/// <img src={logo} className="App-logo" alt="logo" />
      }
        

      </header>
    </div>
  );
}

export default App;
