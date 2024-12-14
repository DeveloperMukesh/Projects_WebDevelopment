import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Screen Dimensions
WIDTH, HEIGHT = 500, 700
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Flappy Bird - Advanced Edition")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
BLUE = (135, 206, 250)

# Clock and FPS
clock = pygame.time.Clock()
FPS = 60

# Fonts
font = pygame.font.Font(pygame.font.get_default_font(), 32)

# Game Variables
GRAVITY = 0.5
FLAP_STRENGTH = -10
LEVEL_DIFFICULTY = 1  # Initial difficulty multiplier

# Bird Class
class Bird:
    def __init__(self):
        self.x = 100
        self.y = HEIGHT // 2
        self.velocity = 0
        self.image = pygame.Surface((40, 30))
        self.image.fill((255, 255, 0))  # Yellow Bird
        self.rect = self.image.get_rect(center=(self.x, self.y))

    def flap(self):
        self.velocity = FLAP_STRENGTH

    def update(self):
        self.velocity += GRAVITY
        self.y += self.velocity
        self.rect.center = (self.x, self.y)

        # Prevent Bird from falling off-screen
        if self.y >= HEIGHT:
            self.y = HEIGHT
            self.velocity = 0

    def draw(self):
        screen.blit(self.image, self.rect)

# Obstacle Class
class Obstacle:
    def __init__(self, x):
        self.x = x
        self.gap = random.randint(150, 200)
        self.top_height = random.randint(100, HEIGHT - self.gap - 100)
        self.bottom_height = HEIGHT - self.top_height - self.gap
        self.top_rect = pygame.Rect(self.x, 0, 80, self.top_height)
        self.bottom_rect = pygame.Rect(self.x, HEIGHT - self.bottom_height, 80, self.bottom_height)

    def move(self):
        self.x -= 5 * LEVEL_DIFFICULTY
        self.top_rect.x = self.x
        self.bottom_rect.x = self.x

    def draw(self):
        pygame.draw.rect(screen, BLACK, self.top_rect)
        pygame.draw.rect(screen, BLACK, self.bottom_rect)

    def is_off_screen(self):
        return self.x < -80

# Game Functions
def draw_text(text, font, color, x, y):
    screen.blit(font.render(text, True, color), (x, y))

def main_menu():
    while True:
        screen.fill(BLUE)
        draw_text("Flappy Bird Advanced", font, BLACK, WIDTH // 2 - 150, HEIGHT // 2 - 100)
        draw_text("Press SPACE to Start", font, BLACK, WIDTH // 2 - 150, HEIGHT // 2)
        draw_text("Press S for Story Mode", font, BLACK, WIDTH // 2 - 150, HEIGHT // 2 + 50)
        pygame.display.update()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    game_loop("endless")
                if event.key == pygame.K_s:
                    game_loop("story")

def game_loop(mode):
    global LEVEL_DIFFICULTY

    bird = Bird()
    obstacles = [Obstacle(WIDTH + i * 300) for i in range(3)]
    score = 0
    level = 1

    running = True
    while running:
        screen.fill(BLUE)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    bird.flap()

        # Update Bird
        bird.update()

        # Update Obstacles
        for obstacle in obstacles:
            obstacle.move()
            obstacle.draw()
            
            # Check Collision
            if bird.rect.colliderect(obstacle.top_rect) or bird.rect.colliderect(obstacle.bottom_rect):
                running = False

            # Check if obstacle is off-screen and recycle
            if obstacle.is_off_screen():
                obstacles.remove(obstacle)
                obstacles.append(Obstacle(WIDTH + 300))
                score += 1
                
                # Increase difficulty every 5 points
                if score % 5 == 0:
                    LEVEL_DIFFICULTY += 0.1
                    if mode == "story":
                        level += 1

        bird.draw()

        # Draw Score and Level
        draw_text(f"Score: {score}", font, BLACK, 10, 10)
        if mode == "story":
            draw_text(f"Level: {level}", font, BLACK, 10, 50)

        pygame.display.update()
        clock.tick(FPS)

main_menu()
