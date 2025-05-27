import { SolaraLogo } from '@/assets/icons'
import { Button } from '@/components/Atoms/Button/Button'

export const Header = () => {
  return (
    <header className={'w-full h-24 bg-gray-900'}>
        <div className={'max-w-7xl flex items-center justify-between px-6 mx-auto h-full'}>
            <div className={'flex items-center gap-4'}>
                <SolaraLogo className={'size-14 text-white'}/>
            </div>
            <Button variant={'gradient-outlined'}>
                {'Sign up'}
            </Button>
        </div>
    </header>
  )
} 