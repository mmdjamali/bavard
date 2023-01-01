const TimeFormater = (
    created_at : string
) => {
  let date = new Date(created_at)
  let now = new Date(Date.now())

  let time = (now.getTime() - date.getTime()) / 1000

  if(time <= 60) return(`${Math.floor(time)}s`)
  time = time / 60

  if(time <= 60) return(`${Math.floor(time)}m`)

  time = time / 24
  if(time <= 24) return(`${Math.floor(time)}h`)
  
}

export default TimeFormater;