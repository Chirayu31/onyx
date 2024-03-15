import React from 'react'

const Content = () => {
    const postContent = `I’ve noticed a big trend amongst my social circle where my liberal
              friends (I live in the Bay Area) are significantly less tolerant
              than my conservative friends. My liberal friends tend to spend a
              lot of time bashing red states (always about roe vs wade, guns ....`;

  const truncatedContent =
    postContent.length > 200 ? postContent.substr(0, 200) + "..." : postContent;
    return (
      <p className="text-sx sm:text-sm md:text-base">{truncatedContent}</p>
    );
}

export default Content