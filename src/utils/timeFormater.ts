const TimeFormater = (
    created_at : string
) => {
  let date = new Date(created_at)
  let now = new Date(Date.now())

  let time = (now.getTime() - date.getTime()) / 1000

  if(time <= 60) return(`${Math.floor(time)}s`)
  time = time / 60

  if(time <= 60) return(`${Math.floor(time)}m`)

  time = time / 60
  if(time <= 24) return(`${Math.floor(time)}h`)
  
  time = time / 24
  if(time <= 30) return(`${Math.floor(time) + (Math.floor(time) === 1 ? "day" : "days")}`)

  time = time / 30
  if(time <= 12) return(`${Math.floor(time) + (Math.floor(time) === 1 ? "month" : "months")}`)

}

export default TimeFormater;