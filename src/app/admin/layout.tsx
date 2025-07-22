import AdminTabs from "./_components/AdminTabs"

const layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <AdminTabs />
      {children}
      </div>
  )
}

export default layout