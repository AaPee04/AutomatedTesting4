import { describe, expect, test, vi } from 'vitest'
import request from 'supertest'
import { app } from '../index'
import * as dogService from '../services/dogService'

describe('GET /api/dogs/random', () => {
    test('Returns 500 and error message when service fails', async () => {
        vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValue(new Error('Network error'))

        const response = await request(app)
            .get('/api/dogs/random')

        expect(response.status).toBe(500)
        expect(response.body).toEqual({
            success: false,
            error: 'Network error'
        })
    })
})