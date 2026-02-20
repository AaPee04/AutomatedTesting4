import { describe, expect, test, vi } from 'vitest'
import { getDogImage } from '../controllers/dogController'
import * as dogService from '../services/dogService'

const createMockResponse = () => {
    const res: any = {}
    res.status = vi.fn().mockReturnThis()
    res.imageUrl = vi.fn()
    return res
}
describe('DogController.getDogImage', () => {
    test('Return dog image with valid request', async () => {
        const req: any = { }
        global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
                status: "success"
            })
        } as Response)
    )
        vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue({
            imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
            status: "success"
        })
        const res = createMockResponse()
        await getDogImage(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.imageUrl).toHaveBeenCalledWith("https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg")
    })
})