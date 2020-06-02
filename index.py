import json
import discord
import random
import os
from discord.ext import commands

with open('botinfo.json') as file:
    data = json.load(file)

client = commands.Bot(command_prefix=data['prefix'])

for filename in os.listdir('./commands'):
    if filename.endswith('.py'):
        client.load_extension(f'commands.{filename[:-3]}')
        print(f'{filename} loaded!')

for filename in os.listdir('./events'):
    if filename.endswith('.py'):
        client.load_extension(f'events.{filename[:-3]}')
        print(f'{filename} loaded!')


@client.event
async def on_ready():
    print('Bot is ready')
    await client.change_presence(activity=discord.Game(name="!help"))


@client.command()
async def clear(ctx, ammout=5):
    await ctx.channel.purge(limit=ammout)


client.run(data['token'])
