import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ErrorMessage } from './error-message'

const meta: Meta<typeof ErrorMessage> = {
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'Something went wrong. Please try again.',
  },
}

export const Empty: Story = {
  args: {
    message: null,
  },
  render: () => <div className="h-8">Nothing rendered when message is null</div>,
}

export const WithCustomClass: Story = {
  args: {
    message: 'Error with custom spacing',
    className: 'mt-2 mb-4',
  },
}

export const LongError: Story = {
  args: {
    message:
      'Failed to fetch hiscores. Please check the username and try again. If the problem persists, the RuneScape Hiscores API may be temporarily unavailable.',
  },
}
