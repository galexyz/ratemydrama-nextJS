const Navbar = () => {
    return (
        <div className='h-16 w-full bg-blue-400 flex flex-row justify-between px-5'>
        <div className='text-lg self-center'>
          RateMyDrama
        </div>
        <div className='cursor-pointer rounded-lg w-24 bg-blue-600 h-1/2 self-center'>
          <div className='text-center py-1'>Sign Up</div>
        </div>
      </div>
    )
}

export default Navbar