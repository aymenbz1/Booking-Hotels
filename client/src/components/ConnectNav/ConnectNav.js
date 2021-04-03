import {useEffect, useState} from 'react'
import{useSelector} from 'react-redux';
import {Card,Avatar,Badge} from 'antd';
import moment from 'moment';
import{getAccountBalance,currencyFormatter,payoutSetting} from '../../JS/actions/stripe'
import{SettingOutlined} from "@ant-design/icons"
import {toast} from 'react-toastify'


const {Meta}=Card;
const {Ribbon}=Badge;


const ConnectNav=()=>{
  const [loading,setLoading]=useState(false)
  const {auth}=useSelector((state)=>({...state}));
  const {user,token}=auth;
  const [balance, setBalance] = useState(0)

useEffect(()=>{
  getAccountBalance(auth.token).then((res)=>{
    setBalance(res.data)
  })
},[]);

const handlePayoutSettings = async() =>{

  setLoading(true)
  //
try{
const res = await payoutSetting(auth.token);
window.location.href=res.data.url
// console.log("RES FOR PAYOUT LINK",res)
setLoading(false)
}
catch(err){
console.log(err)
setLoading(false)
toast('unable to access settings')
}

}

  return (
    
    <div className="d-flex justify-content-around">


      <Card cover={
      <img
        alt="example"
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYZGRgaHB4fHBocHB4hHh4cISEcHCEhHxwhJC4lHiQrHxwhJjgmKy8xNTU1ISQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJSs0NDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAMkA+wMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAACAwQFAQAGB//EADwQAAEDAgMGBAUEAQMDBQEAAAEAAhEhMQMSQQRRYXGB8JGhscEFIjLR4RNScvFCFGKCM5KyFSOiwtIG/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAnEQACAgIDAAIBBAMBAAAAAAAAAQIRITEDEkEiUWETMkJxkcHhI//aAAwDAQACEQMRAD8A/O8eTW24eCRPFUPfJMUJsNwKRlVJFI8QRFUYboRPW19EABNNybhmDJFJ8kMBQGh3J2EI1CLacVriS0CpJgSAOAnRTwU0Ic/Z/M+WnqqDhb6zYb5jyqpA8jVG+RxI13JgHibMZgGd8acyhaACINc3iKwiwtocJikzz7qlvbSUCNHZMdzHPyEHMCwyAaGjon1VewMYZz2330GkiVibNiEOp0VDyfCI76JNNoTLdrYJJGUWgCOE8qqVr/JARXfxXmsE/dXFNKgHOfOiU40qIrv1Xg4V+UeK4Gnd+VTbEh+zZZBdAHcLQ2/HaWNDWiIFAZmN43GFihoqvBjq107CylG3Y6DfGgKF7zxMa6TBTHU03LznXbBi96TvjlRaCTFMxCStb4a1lc89AJnSJoawoWMBAEV36WFhpbzTHYZNZFNJqpcbVA6ObS0B9Kcrarj6gRdeeKW+6WaRXRUlQhJEUnuv3TMNvfqgGHFfREwXjdfzUlBtaJ73j7o5pcyAfb8oW33dhNyDLmr9UARSx/ySbA4xhrHd0QYTIEmUvDCdg4hY4EXG+vdCmAtrC0wZncvZQUePjOc7MbpecJ0SQ45gnfOvfJLcJNKCPz3yTdpaSSSZr5pTWmD0g990UMtMBjRNSie077FE0a7vuukfL1F0DsEG1VRg7K94JaJA106cful5BHFFhPe0HK6BSQNet9UUxWKcwtuKi4K6+p5Iw2vzda1XGYBfRt9B90MLPNXg060Wgz4aQy06zFqIDsUVJk8bIi1LRLkJwsPKRIn8J2Dgl0CDJMDrTwlcbh6lVbNjZXgwD80+pTkmo4Bsbj/B3sbmcIpMVULW0qFufEPipeACJEbtNJWUeAuo4e7VyFJq8CG4RItUV6J4wQKuY7oVVsDBmk9B4rS+LMaGEsJ05qpclSUReHzGJgxak8ZR/pktBoBWmtFW1hMSIPEJztgMSQOYEcRzVykkOyFsTGlE1jWxJBmabogzIQHA+bdGidkpcHxnwTTBs5hP3DcQOhn1C5h7OXTGgmDXdvXY9qz7LT2T4iGMcyG/NckSQRFR4LOcpLSEjIOs+cKXFNVTtL8x/pA9o5x/ataGhDMQ7qAd+aNuJIBHd05rmgy8SJNB3vAXHAE/LOWsTeOKXpQkWjjr3wVUwIa5xF40nggZhF1QBuNdT2V1rIJ5QRySoAwwf4zbW8pm07I5hbaHDQ2B9EBcakBcaXOME0Tpk2C9sXqde+aX+md3kqj9I5eKCO4VpCszRh3mlo81q7HsrDhue4/N/iI6HXqs9/JHhYxFNCsZpvQ2KxMID7JbuAtaU8mSgewReUIaBGzma0XTh7kzPAn6pipnj30SnmTe9h4rSsDOhl58U7ZhldJ7CWzEmkVVLm/LPE//AFj1TcU1RJqbR8QztAgUAHy2gDhqo3skU4USNnxKclQ7aQBSPyojBR0S2wGMN4HFM/SmbDfwuj2czJv334p2UaQqq/RXkzxgGgzA2FPfjPNO/wBO6NfBVQdACntYYMnp/aawJuyDZ8KskkEWTnyaEF0an7Eqh7hEOBHED7JH6YI4GecaXtqlLY0ydh+cGoH4/K+gZtLMhEC/I2i+m/oOmKcHuV5shZ8nF2KUqE7V9c1tWBzTmNOW1YsuNYLm/VXbFsueaiQDAJpQE18E21CORJNsxmiLJjdnLjQd1VW0bPkcQZI3Kz4fjhlXDjWCPD25JSk+txKWzHxdmLbxu3Kd7YPBa/xTFa6sVlZeM7nqqg242xeingOe3LIoRXfUohhkUkXPv7Jb3RYGRu6SmYdyDNOwq9LDw8drDbNO6hHETrZMJMilIjpT8qZ/yuIIHCayf7R4T6gzTdupX+0LZJS1pNKDSvD+k7F2NzRmBlvpuKXh4gDgTxPiIT9o20vH1EyACTcwABJ1MBJuXbGhEuWN6GSq24WYmTF7eib/AKG1rA/WNRO9X2S2SYeJM+3fGUlriIPhwqU/FeaZaHnug+olRvBHMGO+9VnZpRSdoJ3JD6rgrZEG0hAwmSYG63OtfNcw21He8+yFgArpZG3eqAa8yQIg75v3wTcNhIiTdAw2tO5V4RHPhbuycSWxTMGB7p7MATW0ctyMae6a4RxVJIixbJaC0EidyIvG7ohGHMECs1OmWDNOZFeCaWmghp5yPOqmqGGwNyF+Y55EN0jX287JjKzMjVSs1keCfHcKVHDyJlDnU9yhLtEllJj+11r99J3qqYjrgEBZNU8MmJtwKW5xGs8ITYIB3Je2ba3MJFYNx33VMJO8cd6S8dZ5qZRUsMaZzFxC4kmEqeN14s5rmTVNRSwFniamspGM2Y8E0tXcidDJsusVA7+yWARETaL8+/BXPw5nkO/IJOSNLIodi8hIgzJFarjcIg+2lVRhPBcARU09Fe/ZWhsg/NMRFqGsyocknkLZA9lDOvH25oBQgAUTYihO9cZE3hXgQTcTLPTwXDtjv2jzXiAT33dcdhHcUUmBnvNe58klwnXeesx7Bde8gzefbollorpM26RPFZWaJBsafMppYIO+kevt5pWC6CDX+wic0S0n/Kta0k1Q3YJC3sreEQxKU3IsoII3UQQcxgUHHTrdOwGsd2LpuE+uqW1gFJrf0Ri3Dv7q0yGOaZiSVRmnWFM5lRUDdPBER15Jpklrc0XBp3ZG/EAEGK04qFg41Xi2SkBRggFzQSazXiqMWGOIaSQNfNQObGs+y7+pWtKd+inN3Yylj51tqizcaqPDfeqcHCOPf2VqRLiUsed/RczioKnYa8D4rzxAnQpt2CRTn0mi6ceLVSHnchLqgBJpDKcAhxEmBqUzasNoMNOYWnvmFP5LuY7/AO1HV3dh4JN44r2EA4hpMSRXcvEjNIsEQaOlPRaAceIJbIIBNRUHihDflJFez+UTnb0JCBk725a33d9FUMU2lAyBp0XXNGaiXULDayb7kJwzmAFZNvt9kTDGot91xh+Yc/MJsQQbBMiCLzwiQRpZeyO4Iw+ZmpJqZueZQ547Ca0BkbTsrSc2bKKzuB+YjpQeKzmurNpP59vRauNgOe8szZbmmu7zkdEjZNiaT8xJ+Ukj9vHiQBPULlco7R0IiLyO+KM4piLgAxO66a94kAhpAblFLVmeYMr2y4M8QL6co3pt1lgs6PMbJgN/+M0p91oO2QjDJgSInfJpaKdUxmDhAN/UcGkXhw3i8cFXi/Edna1zcxLiZBbLmgDSgob2m/FYS5ZOuqKUN2YeJhkFoENdc05DsoAHAxTWSNY3KjG21pAIBJBtHulbPtRaQcgMWkxpH56LZSlRKRrYHwkOyNJOZ0kRagm5F4UuNs2V+X5gAY13GK8wjf8A/wBA+IyN4kyT409ypcb4o5wggSCKg7ppXms4PkT+Q5qP8QmYMgAAl1rnS1uEK7ZtmcQCJmJqaeKzMDb3NsB1v4hPb8YeP8Wzv/BVycv4kqN7NB+zOaSHUN4nx8z5KV2yOLrxXpvopsf4q97sxyikAAUHITJXGbe9u41JEg31I8EKU0gcV4X43w17WBwsZGaRU+oCRlc0S71le/8AUcZzYoATM09z6DQKTGx36vnSBbfuCIyn6EoxeivExALAnu1U3AY5zZLCAIilws04z4+rvwVWB8Rc1jmDJ80SSCSCCDQ2iliIVuUvCeiLWQAQQQkteM0T50vbmp9s2x+I4EwKAQ2QKUm2qBrogZPzXj9kdpVkXVGkXAm6cCO9FC7aGF8jDLBQQ2DzNR16J7sTDzmf1MmmUAEUvBR+rXgugRw+K41pElRHHaNTFKGa9dEOPtEElmYM3Gp01gK+/wCA6lrnrrHtAufBRucRXNMAG+kwiIlubM2ZiJqjug6sqwxOvXrC4KQTN4SKSMo51Gvh3CpGyuLZzgmYi/iZ47t6n9RLYdQcF8yKa6prH1vQX8phDtOy5SIkiBWNa33qg7I3JOeI0JAtfnpG+eCP1VVh0bEgVodEGI6pgFO2bCa8wSRBvE0791Pj4UOIBFO/2ofIilxsj2n4iQ8kNuAK311UJ2x4nKIm+vqqXMHMpTixl7+f4WajGKKuyXI91SSPRd/0tJmeaJ+1A0DQOdT4pbpN3KgtnQxo48l0EiwPmjw2ZTcHW9LTYInV149yAixWAQ6JJjvghIE6ny9k04VKw0UqfsK+K417AQYJ4yBPQAx4oGmEzCYR8ocTE2mEkuM0HL0Wr8FZne6QMrWOoY1Ec3clC7Dj6pUxzJoelZOxp7+yp2Z5BAuZi9rR6qfIqvhzR+owkGM2hI4UI5qpLDYC9oZLjWs+iU4EGOJ9VpfF8IjFdcg1k6+Cjy8ER+UUwusF+ybCXYL3kkZS2lTQ9N/dQs97KwDK+s+CsjZnENMuJA+b5T8sWmhmlR1WDtGIToNyjjl2bX0wlimT7PhBxDagk0pPitnZthb+m+WNLhFYG/xUGy0fNaTZbmywWYk0hsjdNb13jmq5W1G/6ITuVEe0bI0BhADczbQLjvVLezUSqNpJyYf8d/FTF0TUquPMcilvBTigD9J1CSNxzUgC5tpp0VOG0fquZEA1EV0pXiYUe0PlmFQSAaccx3bwJ66WVIcRjB4ua1JGkaDvqsGr39f7NFSf+DH2jDbUAxUxr4mFA4O0IjgtbacNxAJJvWw8yspndYXRVEJnW4h7hPw5cZgGIzUCSc01I6xPoq9kwhJkxuiD4pN0rAIhuX6R4QdUDL1EcZ48+a6aOImnCfRdcaR7n0KHHFisftbHMdAOgqcw371Mx7zcutckx5DgPJaG24f/ALeGaGABERS8+yL4KxhxCHiBkMQRSlb0NJ0KhYhf0XWaMx+I6dQaWvO9FDv2OPGHI8Xl4rf2bZWljTlbUD6gyba1T5ZdEgiux8fiYr3D5WOgXIaSPECFDmE0E76dhVaEWnUEz1EpQwR+4creoSQDGiZhni4+QXXGJoea61rC2TmzWOXLC9g4UFsiQdJ+Y9IPijskKj2zMc40npp5LSDDQX5wPKApsTHDGlgkA1g5jO68ei0dlwHN2fOZZJiQG1B/cS4EdY4TZZSlpsrrbwZO2YhJyu0tHpfyUwYE/EcDupuCW1vLoulLBBsfAGQ8uyAiIM6dAZG6VPtrZJ3TYesGFb8KmhgxJEgUFD08bqDa3OqHCDoYrfdbosYy/wDRlNfFEMd1Wh8LYMzXXqKSbzuus+NZnotf4ThmRAJkiaUjjpS9VpyOosSG/GmfPNPmFhNPH7rJNFvfGhaxGsGRytE60WI0c0uB3xoJYbN/4I4fpmlWvaZJAqS3fpQfdYuMASdK6W1rRbOwOjCy5iPnbqQZpGu8DTisvamw5wrIJuZ81PH+6RUv2oHAd85rqd1VrbG8gYjYuO6XqsTDcQ+fJbPw0Odm+aBwg+o43oq5WlHP4IS+R7GxCMJlKEkitBQTA408DvUGaZgLQ+JtcxrQ4uiYg5THUW5His9jzDpmOXIJ8LuF/ljksmg/EBayltSDwBvcQFQxwGIx2YC4m4tqNVBhu+WYNLkMA5Gpr91QzaDR0mb/AEuA86FYyjdV+Sk6EbXlOYHLc0trvhYzorQjrT0WtjvEGS21jU20PJZMEGi6En1RHrCFde/BU7I8b44wfUVUhJioVGy4pBAkCeEjqEPTALFe6aku48PJcz85XsYNLjQj+IgLrWbiTzTrAGj8QhwYZqGtBGlNQRIjl1Xfhry1x+YZYOZsSHAVubRN0WNswGHSusm43xqEr4YRnE1Fd26aAxNtFkmnxNLwqvkibGbEgjfE38idF9FsLi3DYMwoBZzVh7afnMTwkg/+NrrSwdvflH1Hofso5rlFYHCk2fGl9dZRM/3Dqd3JMaG2MDrWeunVOeBlGUgneflp3yVN+CEP2iBlAH8orHWkJRa5rqPgixkinMLhbJ/bPUBNc5rXgtHhThr7ppLQWTtMwTJk76+fRfQ7NtLHMDHOAP7SSy3ksTEd8xNR1E+VFotbiBgLXtMgHK9hF9xLCHeKz5Y2kUmROIg5SHcOC8y479V1zyakAQLNaAPAf0heK0voulO4mfp9H8OkF1zT6SAeRgXqs/4iz5gcxMzR0gjWALhD8O2qKRlmxiW+BBb7peNjZmEuNjQA0m306LlhFqdmja60T5DNJHe9bPwpskTu05XrryhYzG5uK0/huIBLXbtCPas8IWnNfVkx2V/FoDTY8SIMV1CwQrviGA5p+UktIsS6efzAKFrh+6ObaeI+yXDUYDksm40HIJEulosaybTO496xfEcOryKg8Ivw3oMPanBuU5TEERWoIIF943eq7i7U4klpMH/aRfTioipRkN0xDLyRVbPwkzUUM1FYn+IWE/EE0JbuvbnCv+F48SS4WpU132E6blfN8oUhRVSss+KYgLhLvmiMoJIppJrdQMBGY10tyVm2bQXGrvlp/lInlUqJgkmHC+s1+8LThaUETLLLHYbS2YbxFo955rwOUNvlpcWJEWNPNKa8QBDTFrTXja6436IAzReKgD3U0vQyC9whwDp4gCFmPJk61urMR8SIPC/gpX4c1lbXaEkcaaJ+yxISg0+CpYwRWEJAw9pJDtT1CXn1VOOwZRbwhTFkdU+uBJmq92Zhn1aa+SX8MeM+tBX6aaVDroMfGJw/8piJIETqJqUr4aCXmW5qcPOVzpVBou/kmVfFAM0zM6RQCvdFVsuy4RY0mLbx7qfb+IcNwplF91QaoMDDBaP+n1NetQkk3BZBfuZgYj4cDBjpfeIlDjPzOEzpFIEcAvB3zfKRrUz2Oi63MDcHdqqjHIPArJPSxAr+UyCTH1cFwM414BMwcxkTSm4z1VqiWzjmCLc7DyVmyPdlgGIFpAmp4jzUobxV2ysaGk5w0nWY9iSp5kkkKLZC4XAFt33C6J3Hnu6LmKw5iZkzfU+iB16AjmtYr45D01tm2kvYQ4h7rxEUnlHSNVnbQAHTlaOAaR636Ktm1OcGtMcSYtuggwg2hktDhEToSSOegHELCKp6otsWLGN01FPW6fsIa85XBsAfUQAeB3ylMdPfsn7KG5zoRrAgdZV8sX1siLFYz8RhkPc5gMAhx+/cKQ4gJkuPIj3Cq27Fk5ZBaCTIAkaRyqpMJkujTz9FnFYya7G4YqTmbHCnsrMPZX7gf9zjTpFhVN2DBa2HH6jvrHgr248kSKeimUgFYextpJObhWvWT0TzsNZieLmt9oVWwAZnO30HjU+BR7RtIDhltE+49weaydthtWSP+H5mxRo4NvHMkDmpz8KYD9ddwFh+LSrHYo8Y6xP3J6lASJ311VRbXong4zZg20CN967iO+CXi4bSJI66jwXMfEi061791O/FOoO7vQq0m8k2mBjgNjKSd/zGnUGfJTfrumrWRq4x6kp72f5AAHxCU0W/xnUO9irSwFonxngmBl30j2NY5rjH9QPSyc/Bky0D3P2SACBMUNLcFom0gwypz+IjogfF4oEDn/LBEaR+FzBaKTath2E+zoVFuI8BhABE+fiFz4eyHH5CTFhHnolOysE7uA/KbgMdR7SYiYEVHFRa6hpj9vfEUcOoPnJS24nB/iP/AMrm0vLiPmEAWEDvok5f9w8E4ayD/BlYOFLvqEcfsiMAuM8DTXlp0TQ1rLF7HcRM3od3JKeQZdlE61vxLd+vBTF5GzmynM6IHEphBbVpB5H2SxjuAhv0nTKBxNuPsgAoTAHduBTTd5G0GXxqJ81c7boEkkA0MV8joswGTDtNTPhQKhlyM0zSAASaTqZSmkxUJY+HT6fZDmk3nqfdLcCL19kxjWzeOaux0ivCcAAQQHbiL/8AL2RNc4kDKSZrSRxuvNaCIBIMRUCDry811mDzzGlTHKFFBaBYaROu+CulpDvlkm/oqsDBoQ7XqFXhYYtcDd7LRyVGfamQYeAXXg9ADxBKow8ENMtAkbu6qzI0AZax90Ig1iTuFCsrV0O28nW79NZ0Qkz+PsmMYHyWkiNDXzXADaoOk2Ra/FjQLXGKHd5I2YpoSDr4IDU1HOF5r+IjQ+ylx+iuwReJIuPb2XC4mkpZHVG10Dh6KuqSsVnHk9e9UDnzTxXMQuEbjYomvm8d8Lppk0dMClu+7o8DGaGmlKgmOlEGK+GnhaVKzDflI/dXwn7yhpPY4lODhl5hjRJGp1m3e9Kfga+I3KjZRkyh9JbMg1pUGRrfxXcTGBflFI1qNbXtZHZ3QV9CGbEXCWweppzESp24Lm3BvpVXuE19JH9IX9Ohr4ckW/f+iv6JcYOMR2OSnbiwRPkIotDI4ilRwUzsGv08KG4PpB8iDypOwsDaceYyy4byLRuN4S/1uf8A2/lO/wBNYwRTuunXyS8h39+KFSHaMvFxMxJM8xFPC6axsAvBkWIsZppexvzSjhmazM7rhPwNnJMuE3kajdUVKSt6KdIQ94FicvP0PVOwnTwrWHUOlf287eCHFkHKGx76isAlFh7NoTBGn23pNBYNWmRedb+BCNuC52gI5BWYezhtNBoZ8u4tvTi0UNp6jqO/FNZIcqI27KBSD3/YR4WyiaGOYkecJrmkCSJ31n+pT6x7q1glybEOwaFo+rcRu3Img0mK0MXHMap7HTGa47oV3GEmTE79/MaobaFtnsJh5+/5/CqwgK6E+vfd4lw2xenI074KnCJBB33KxnbWC1SHtEXidT43UuJhV3b9fz1Coz1v3TXUJhY01c3X6hdR2SocU7I2PLHVFfIjiihpJ+UitIcm4t4pmGh1B70S8jRUWNY1G9F0U8nWNv66136IQyLlpG8UPVc/UIsaRcfZecQRMAwaEfKVSu8kgtcIIBaRziy4cMxeNwN/FHhMabN3EtI7lFmmhzExa5B+yu0ngX9if1NIjhpPA6LjQDcweNE5+G4CokHvWi4xgNIk6bx4ITSyhnHMkEad2UWKAeYoDvia+EeC0A2usePldQbMJmlRbrEe3inF/Y0hzGfpvLozZZgE0vH3XWj5i41cZBJ36wOeqWHF0HhHfgUTDaetYiSTflToh7Kq0UuNImularjN5r3FRv8AJTtzSWmvPw7I/swDMbuiql6Z5Q/NNiGnhT8HkgGzSRP/AHW8U1pzAUEjQ69UOKy0NykCCKjf424c0r8EC7Ci7iREJf6H+4eA+ydkpv4EwR1Xms4O8Pwk3Q6MTaMKpBcCN405f1T1VgVlpruOtNJ1PNMxPrd3ovYlvD2SRckExzctJJFiZJFpEGw4XtzQtxAaAxWxqOk2TG6/yHskY1+rfQrR6MyluITEUi3So9OiMviwMSfDvz8+PRD6h191Plgew9pG7hbvuU39QaeHBSM/6ngm4f1f8FXrJrA0vG+nfgiGI2Ep1+hR4NnfxPsrJDONHLRG3aJsYIihjvvwlP0DkfZDsf0t5H0ChwRong0HY3IHXdwKbh7VUkaXGjvylm5/i70Sth+lvJ/qFzuKyWih+0MJkZQdwNCfY98ErF2hpmRGsi7Tvp4JOJd382+oTTY/xHqr6qgR1r5sAREbnRz1SsxFoI1H3Fk9v39WL2Lfr7hSMVh4oEwCPRUNxiR9OlKx4aqT/M/xTm/V4+oTksWFBh75EuinPxRufGoI8/ApWJ/h/JA6wRskbjPvBl0Um/5UuCwgfNQnyiluNddypP0N71KNv0n/AI+6YyRtyO7x6IQ4V4W/rWPZE7/qn+TfQoWfWf5H0CZQWGRwP54qhkEUNRe3vdJwrN5H/wAlQ2470RIhbBaQaSO/RNDqfVPA6ctyldfquC5/irmtEopONNCOR101jghznR3mg2f6Rz9wj38z6lZtlH//2Q=="
      />
    }>

        
        <Meta
          
          // avatar={<Avatar>{user.name[0]}</Avatar>}
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>  
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Avaliable" color ="grey">
              <Card className="bg-light pt-1">
                {balance &&
                balance.pending &&
                balance.pending.map((ba,i)=>(
                  <span key={i} className="lead">
                    {currencyFormatter}
                    {/* {ba.amaount} {ba.currency} */}
                  </span>
                ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="silver">
              <Card onClick={handlePayoutSettings} className="bg-light pointer">
               <SettingOutlined className="h5 pt-2"/>
              </Card>
              </Ribbon>
          </>
        )}
    </div>
    
  )

}

export default ConnectNav;
