import json
import discord
import random
import os
from discord.ext import commands


async def InBotsChannel(ctx):
    if ctx.channel.name == 'bot-cmds':
        print('true')
        return True
    else:
        await ctx.send(f'{ctx.author.mention} Please use the bot commands channel')
        print('false')
        return False


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


client.run(data['token'])
