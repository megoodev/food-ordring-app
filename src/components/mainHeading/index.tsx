
const BasteHeading = ({ title, description }: { title: string, description : string}) => {
  return (
    <div className="flex flex-col mb-5">
      <span className='font-semibold text-accent-foreground'>{title}</span>
      <strong className='text-primary font-semibold text-4xl'>{description}</strong>
    </div>
  )
}

export default BasteHeading