import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import * as dogService from '../services/dogService'

vi.mock('../services/dogService')

describe('GET /api/dogs/random', () => {
    test('is succesfully called and returns dog image', async () => {

        const mockDogImage = {
            imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
            status: "success"
        }
            
        vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockDogImage)

        const response = await request(app)
            .get('/api/dogs/random')

        expect(response.status).toBe(200)
        expect(response.body).toEqual({
            success: true,
            data: mockDogImage
        })
    })
})