import React from 'react';


const BlogCard = ({ blog, onOpen }) => {
  return (
  <div>
    <div
      className="border rounded-lg p-4 shadow-lg mb-4 cursor-pointer flex flex-col items-start"
      onClick={() => onOpen(blog)}
    >
          <img
        src={blog.image}
        alt={blog.title}
        className="w-full cover rounded-lg"
      />
      <div className="flex flex-col mb-4 md:mb-0 md:mr-4">
        <h2 className="text-2xl font-bold text-[#9D003F] mt-2 text-center ">{blog.title}</h2>
        <p className="text-gray-700 mb-2 text-center  text-black my-4">
          {blog.content.english.substring(0, 150)} ....
        </p>
      </div>
    </div>
    </div>

  );
};

export default BlogCard;
