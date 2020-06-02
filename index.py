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


@client.event
async def one_member_join(member):
    print(f'{member} has joined a server')


@client.event
async def on_member_remove(member):
    print(f'{member} has left a server')


# @client.command()
# async def ping(ctx):
#     await ctx.send(f'Pong! {round(client.latency) * 1000}ms')


@client.command()
async def test(ctx):
    if ctx.message.channel.name == "general":
        await ctx.send(ctx.message.channel.id)


@client.command()
async def clear(ctx, ammout=5):
    await ctx.channel.purge(limit=ammout)


client.run(data['token'])
