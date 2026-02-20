import { expect, test, vi } from 'vitest'
import { getRandomDogImage } from '../services/dogService'

test('Returns dog image with correct structure', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
                status: "success"
            })
        } as Response)
    )

    const result = await getRandomDogImage()
    
    expect(result.imageUrl).toBe("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg")
    expect(result.status).toBe("success")
})

test('Call is Rejected and returns error is thrown', async () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: false,
            status: 500
        } as Response)
    )
    
    await expect(getRandomDogImage()).rejects.toThrow('Dog API returned status 500')
})