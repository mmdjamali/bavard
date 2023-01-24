import React , { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { rootType } from '../../../redux/store'
import TopicRelatedPosts from './TopicRelatedPosts';
import InfiniteScroll from '../../../utils/InfiniteScroll';
import WhoToFollow from '../../../pages/WhoToFollow';
import WhoToFollowMobile from '../../../pages/WhoToFollowMobile';

const Topics = () => {
  const profile : any = useSelector((state : rootType) => state.AuthSlice.profile);
  const [max , setMax] = useState<number>(3);
  const [interests , setInterests] = useState(profile?.interests.slice(0,max))

  useEffect(() => {
    setInterests(profile?.interests.slice(0,max))
  }, [max])

  return (
    <div>
        {
            interests?.map((item : string , idx : number) => {
                return(
                    <TopicRelatedPosts
                    key={item}
                    topic={item}
                    />
                )
            })
        }

        <InfiniteScroll
        hasMore={profile?.interests.length > max}
        setMax={setMax}
        pending={false}
        data={true}
        num={3}
        />

        <WhoToFollowMobile/>

    </div>
  )
}

export default Topics