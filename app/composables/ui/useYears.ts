import { ref } from 'vue'

export function useYears() {
  const curYear = ref(999);
  const getYears = () => {
    const years = [999]
    for (let i = new Date().getFullYear(); i >= 2018; i--) {
      years.push(i)
    }
    return years
  }
  const years = ref(getYears())
  const handleClickYear = (year:number)=>{
    curYear.value = year
    return Promise.resolve(year)
  }
  return {
    curYear,
    years,
    handleClickYear
  }
}
