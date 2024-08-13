'use client'

import { useState } from "react"

export default function LikeButton() {
    const [likes, setLikes] = useState(0)

    function handleLike() {
        setLikes((likes) => likes + 1)
    }

    return (
        <div className="flex gap-2 items-center justify-end">
          <span className="font-bold">{likes} Likes</span>
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold px-4 rounded"
            onClick={handleLike}
          >
            Like
          </button>
        </div>
      )
}