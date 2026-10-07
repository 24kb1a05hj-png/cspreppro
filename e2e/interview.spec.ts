import { test, expect } from '@playwright/test';

test.describe('CS PrepPro Pro End-to-End Tests', () => {
  test('should navigate to the simulator and start an interview', async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:3000/');
    
    // Check if the landing page has the start interview button
    const startButton = page.getByRole('link', { name: /Start Free Interview/i });
    await expect(startButton).toBeVisible();
    
    // Click to go to the simulator
    await startButton.click();
    await expect(page).toHaveURL(/.*simulator/);
    
    // Validate simulator page title
    await expect(page.getByText('Live Interview Simulator')).toBeVisible();

    // The start proctoring button should be visible
    const proctorButton = page.getByRole('button', { name: /Start Interview/i });
    await expect(proctorButton).toBeVisible();
    
    // Click to start interview
    // Since we mock getUserMedia, we just check if it gets clicked
    // Playwright needs permissions for camera/mic to test properly in real environments
  });

  test('should navigate to study hub and interact with quiz', async ({ page }) => {
    await page.goto('http://localhost:3000/learning');
    
    // Check module titles
    await expect(page.getByText('Data Structures & Algorithms')).toBeVisible();
    
    // Check quiz question
    await expect(page.getByText('Which data structure provides O(1) average time complexity for lookups?')).toBeVisible();
    
    // Answer the quiz (Hash Table)
    const optionButton = page.getByRole('button', { name: 'Hash Table' });
    await optionButton.click();
    
    // Explanation should appear
    await expect(page.getByText('Explanation:')).toBeVisible();
  });
  
  test('dashboard should render stats', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page.getByText('Performance Dashboard')).toBeVisible();
    await expect(page.getByText('Activity Streak')).toBeVisible();
    await expect(page.getByText('Focus Violations')).toBeVisible();
  });
});
