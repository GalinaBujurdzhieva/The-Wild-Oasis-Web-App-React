'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

function Filter(){
const searchParams = useSearchParams();
const router = useRouter();
const pathName = usePathname();
const activeFilter = searchParams.get('capacity') ?? 'all';

function handleFilter(filter) {
const params = new URLSearchParams(searchParams);
params.set('capacity', filter);
router.replace(`${pathName}?${params.toString()}`, {scroll:false})
}
return(
    <div className="border border-primary-800 flex">
        <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>All cabins</Button>
        <Button filter='small' handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3</Button>
        <Button filter='medium' handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7</Button>
        <Button filter='large' handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12</Button>
    </div>
)
}

function Button ({filter, activeFilter, handleFilter, children}){
    return(
        <button onClick={() => handleFilter(filter)} className={`px-5 py-2 border border-primary-800 hover:bg-primary-800 ${activeFilter === filter ? "bg-primary-800" : ""}`}>{children}</button>
    )
}

export default Filter