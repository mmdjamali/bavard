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

        <div
        className='
        w-full
        flex
        flex-col
        items-center
        mt-2
        '>
          <div
          className='
          my-1
          flex
          flex-wrap
          gap-2
            justify-center
          '>

              <a
              href="https://github.com/1stMmD/bavard.git"
              className='
              text-[.8rem]
              text-neutral-500
              hover:underline
              cursor-pointer
              '>
                  Star us on GitHub.
              </a>

              <a
              href="https://github.com/1stMmD/bavard.git"
              className='
              text-[.8rem]
              text-neutral-500
              hover:underline
              cursor-pointer
              '>
                  Contribute with us.
              </a>

          </div>
          
          <span
          className='
          px-4
          text-[.8rem]
          text-neutral-500
          '>
              © 2023 
              <a 
              href="https://www.linkedin.com/in/mmdjamali/"
              className='
              hover:underline
              ml-1
              '
              >
                  Mohammad Jamali
              </a>
          </span>
        </div>
        <InfiniteScroll
        hasMore={profile?.interests.length > max}
        setMax={setMax}
        pending={false}
        data={true}
        num={3}
        />

    </div>
  )
}

export default Topics