"use client";

export default function Searchbar() {
    function onSubmit(e) {
        e.preventDefault();
        console.log("search submitted")
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="search"></label>
                <input type="search" id="search" name="search" placeholder="Search stickers..."></input>
                <button type="submit"></button>
            </form>
        </div>
    )
}