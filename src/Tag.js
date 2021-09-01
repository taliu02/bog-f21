import React from 'react'


export default function Tag({ tag, toggleTag }) {
    // const classes = useStyles();
    function handleTagClick() {
        toggleTag(tag.id)
    }
    return (
        <div>
            <label>
                x {tag.name}
            </label>
        </div>
    )
}
