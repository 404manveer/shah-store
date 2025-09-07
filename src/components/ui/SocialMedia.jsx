import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import { Github, Instagram, LinkedinIcon, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SocialMedia = ({ className, Iconclass,IconBoxClassName }) => {
  const socialmedia = [
    {
      icon: Github,
      href: 'https://github.com/404manveer',
      title: 'GitHub',
    },
    {
      icon: LinkedinIcon,
      href: 'https://www.linkedin.com/in/manveer-shah-341282246/',
      title: 'Linkedin',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/manveershah007/',
      title: 'Instagram',
    },
    {
      icon: X,
      href: 'https://x.com/ManveerShah008',
      title: 'X',
    },
  ]

  return (
    <div className={cn('flex gap-6', className)}>
      {socialmedia.map((item, id) => {
        const Icon = item.icon
        return (
          <TooltipProvider key={id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  target="_blank"
                  className={cn(
                    `border p-2 flex items-center justify-center size-12 font-bold hovereffect hover:text-blue rounded-full`,
                    IconBoxClassName
                  )}
                >
                  {/* Now you can control the size */}
                  <Icon className={cn(`size-4`,Iconclass)} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{item.title}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}

export default SocialMedia
