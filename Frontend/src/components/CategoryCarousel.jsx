import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


export default function CategoryCarousel() {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let setQueryStore = (c) => {
        dispatch(setSearchQuery(c))
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="max-w-xl mx-auto">
                <CarouselContent>

                    {
                        category.map((c , ind) => {
                            return <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex items-center" key={ind}>
                                <Button variant="outline" className="rounded-full" onClick={() => setQueryStore(c)}>{c}</Button>
                            </CarouselItem>
                        })
                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}
